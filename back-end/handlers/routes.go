package handlers

import (
	"JoaoVMansur/Korean-Portuguese-vocab/controllers/cardController"
	"JoaoVMansur/Korean-Portuguese-vocab/controllers/userController"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/words", func(c *gin.Context) {
		cardController.GetCards(c, db)
	})
	r.POST("/word", func(c *gin.Context) {
		cardController.AddCard(c, db)
	})
	r.POST("/login", func(c *gin.Context) {
		userController.LogIn(c, db)
	})
	r.POST("/signup", func(c *gin.Context) {
		userController.SignUp(c, db)
	})
}
