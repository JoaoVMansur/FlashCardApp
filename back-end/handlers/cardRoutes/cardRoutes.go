package cardRoutes

import (
	"JoaoVMansur/Korean-Portuguese-vocab/controllers/cardController"
	middleware "JoaoVMansur/Korean-Portuguese-vocab/middleWare"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitCardRoutes(db *gorm.DB, r *gin.Engine) {
	r.GET("/cards", middleware.RequireAuth, func(c *gin.Context) {
		cardController.GetCards(c, db)
	})
	r.POST("/card", middleware.RequireAuth, func(c *gin.Context) {
		cardController.AddCard(c, db)
	})
	r.PUT("card/:id", middleware.RequireAuth, func(c *gin.Context) {
		cardController.EditCard(c, db)
	})
	r.DELETE("/card/:id", middleware.RequireAuth, func(c *gin.Context) {
		cardController.DeleteCard(c, db)
	})
}
