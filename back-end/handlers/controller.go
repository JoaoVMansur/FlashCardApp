package handlers

import (
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetWords(c *gin.Context) {
	words := []schemas.Word{}
	result := db.Find(&words)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, result.Error)
	}
	c.JSON(http.StatusFound, words)
}

func AddVocab(c *gin.Context) {
	var word schemas.Word
	var duplicada schemas.Word
	if err := c.BindJSON(&word); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if err := db.Where("korean_word = ?", word.KoreanWord).First(&duplicada).Error; err == nil {

		c.JSON(http.StatusNotAcceptable, gin.H{"error": "word already added"})
		return
	}

	result := db.Create(&word)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, result.Error)
	}
	c.JSON(http.StatusCreated, word.ID)
}
