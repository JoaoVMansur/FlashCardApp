package userRoutes

import (
	"JoaoVMansur/Korean-Portuguese-vocab/controllers/userController"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitUserRoutes(db *gorm.DB, r *gin.Engine) {
	r.POST("/signup", func(c *gin.Context) {
		userController.SignUp(c, db)
	})
	r.POST("/login", func(c *gin.Context) {
		userController.LogIn(c, db)
	})
	r.POST("/logout", func(c *gin.Context) {
		userController.LogOut(c)
	})
	r.POST("/update-user", func(c *gin.Context) {
		userController.EditUser(c, db)
	})
	r.GET("/validate-token", func(c *gin.Context) {
		userController.ValidateToken(c)
	})
}
