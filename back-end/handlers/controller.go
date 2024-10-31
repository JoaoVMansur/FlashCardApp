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
	if err := c.BindJSON(&word); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	result := db.Create(&word)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, result.Error)
	}
	c.JSON(http.StatusCreated, word.ID)
}
