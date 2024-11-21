package handlers

import (
	"JoaoVMansur/Korean-Portuguese-vocab/controllers/cardController"
	"JoaoVMansur/Korean-Portuguese-vocab/controllers/collectionController"
	"JoaoVMansur/Korean-Portuguese-vocab/controllers/userController"
	middleware "JoaoVMansur/Korean-Portuguese-vocab/middleWare"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/signup", func(c *gin.Context) {
		userController.SignUp(c, db)
	})
	r.POST("/login", func(c *gin.Context) {
		userController.LogIn(c, db)
	})
	r.POST("/logout", func(c *gin.Context) {
		userController.LogOut(c)
	})
	r.GET("/validate-token", func(c *gin.Context) {
		userController.ValidateToken(c)
	})

	r.POST("/collection", middleware.RequireAuth, func(c *gin.Context) {
		collectionController.CreateCollections(c, db)
	})
	r.GET("/collections", middleware.RequireAuth, func(c *gin.Context) {
		collectionController.GetAllCollectionsFromUser(c, db)
	})
	r.GET("/collection/:id", middleware.RequireAuth, func(c *gin.Context) {
		collectionController.GetCollection(c, db)
	})
	r.GET("/cards", middleware.RequireAuth, func(c *gin.Context) {
		cardController.GetCards(c, db)
	})
	r.POST("/card", middleware.RequireAuth, func(c *gin.Context) {
		cardController.AddCard(c, db)
	})
	r.DELETE("/card/:id", middleware.RequireAuth, func(c *gin.Context) {
		cardController.DeleteCard(c, db)
	})
}
