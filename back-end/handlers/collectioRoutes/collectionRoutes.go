package collectionRoutes

import (
	"JoaoVMansur/Korean-Portuguese-vocab/controllers/collectionController"
	middleware "JoaoVMansur/Korean-Portuguese-vocab/middleWare"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitCollectionRoutes(db *gorm.DB, r *gin.Engine) {
	r.GET("/collections", middleware.RequireAuth, func(c *gin.Context) {
		collectionController.GetAllCollectionsFromUser(c, db)
	})
	r.GET("/collection/:id", middleware.RequireAuth, func(c *gin.Context) {
		collectionController.GetCollection(c, db)
	})
	r.POST("/collection", middleware.RequireAuth, func(c *gin.Context) {
		collectionController.CreateCollections(c, db)
	})
	r.PUT("/collection/:id", middleware.RequireAuth, func(c *gin.Context) {
		collectionController.EditCollection(c, db)
	})

	r.DELETE("/collection/:id", middleware.RequireAuth, func(c *gin.Context) {
		collectionController.DeleteCollection(c, db)
	})
}
