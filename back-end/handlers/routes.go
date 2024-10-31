package handlers

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/words", GetWords)
	r.POST("/word", AddVocab)
}
