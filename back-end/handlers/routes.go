package handlers

import (
	usercontroller "JoaoVMansur/Korean-Portuguese-vocab/controllers/userController"
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
	r.POST("/login", func(c *gin.Context) {
		usercontroller.LogIn(c, db)
	})
	r.POST("/signup", func(c *gin.Context) {
		usercontroller.SignUp(c, db)
	})
}
