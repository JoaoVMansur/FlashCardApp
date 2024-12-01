package handlers

import (
	"JoaoVMansur/Korean-Portuguese-vocab/handlers/cardRoutes"
	collectionRoutes "JoaoVMansur/Korean-Portuguese-vocab/handlers/collectioRoutes"
	"JoaoVMansur/Korean-Portuguese-vocab/handlers/userRoutes"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	userRoutes.InitUserRoutes(db, r)
	collectionRoutes.InitCollectionRoutes(db, r)
	cardRoutes.InitCardRoutes(db, r)
}
