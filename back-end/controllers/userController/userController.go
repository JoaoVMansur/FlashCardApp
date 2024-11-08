package userController

import (
	"JoaoVMansur/Korean-Portuguese-vocab/repositories/userRepository"
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func LogIn(c *gin.Context, db *gorm.DB) {

	var userFetched schemas.User

	if err := c.BindJSON(&userFetched); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	passWord := userFetched.PassWord

	user, err := userRepository.GetUser(db, &userFetched)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Password or User Invalid"})
	}

	if user.PassWord != passWord {
		c.JSON(http.StatusNotFound, gin.H{"error": "Password or User Invalid"})
	}
	c.JSON(http.StatusOK, user.ID)
}

func SignUp(c *gin.Context, db *gorm.DB) {
	var user schemas.User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	userID, err := userRepository.CreateUser(db, &user)

	if err != nil {
		c.JSON(http.StatusBadGateway, err.Error())
	}

	c.JSON(http.StatusCreated, userID)

}
