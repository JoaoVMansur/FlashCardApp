package main

import (
	"JoaoVMansur/Korean-Portuguese-vocab/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	handlers.InitializeHandler()
	r := gin.Default()
	r.Use(cors.Default())

	handlers.SetupRoutes(r)
	r.Run("localhost:8080")
}
