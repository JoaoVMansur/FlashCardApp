package wordcontroller

import (
	"JoaoVMansur/Korean-Portuguese-vocab/repositories/wordRepository"
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetWords(c *gin.Context, db *gorm.DB) {
	words, err := wordRepository.GetAllWords(db)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Internal Server Error",
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, words)
}

func AddWord(c *gin.Context, db *gorm.DB) {
	var word schemas.Word
	if err := c.BindJSON(&word); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	wordId, err := wordRepository.AddWord(db, &word)
	if err != nil {

		if customErr, ok := err.(*wordRepository.WordAlreadyAddedError); ok && customErr.Status == 406 {
			c.JSON(http.StatusNotAcceptable, gin.H{
				"error":   "Not Acceptable",
				"message": customErr.Message,
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Internal Server Error",
			"message": err.Error(),
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Word added succesfully",
		"wordID":  wordId,
	})
}
