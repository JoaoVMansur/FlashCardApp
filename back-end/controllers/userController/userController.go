package userController

import (
	"JoaoVMansur/Korean-Portuguese-vocab/auth"
	"JoaoVMansur/Korean-Portuguese-vocab/repositories/userRepository"
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func LogIn(c *gin.Context, db *gorm.DB) {

	var userFetched schemas.User

	if err := c.BindJSON(&userFetched); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	passWord := userFetched.PassWord

	user, err := userRepository.GetUser(db, &userFetched)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Password or User Invalid"})
		return
	}

	if user.PassWord != passWord {
		c.JSON(http.StatusNotFound, gin.H{"error": "Password or User Invalid"})
		return
	}

	tokenString, err := auth.CreateToken(user.UserName, user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Login Successfull",
	})
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
func ValidateToken(c *gin.Context) {

	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Token Not Found",
		})
		return
	}
	claims, err := auth.VerifyToken(tokenString)
	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Token",
		})
		return
	}
	exp := claims["exp"].(float64)
	now := float64(time.Now().Unix())
	if now > exp {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Token Expired",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Token Validated",
	})

}
