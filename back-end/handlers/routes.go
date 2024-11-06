package handlers

import (
	wordcontroller "JoaoVMansur/Korean-Portuguese-vocab/controllers/wordController"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/words", func(c *gin.Context) {
		wordcontroller.GetWords(c, db)
	})
	r.POST("/word", func(c *gin.Context) {
		wordcontroller.AddWord(c, db)
	})
	r.GET("/user")
}
