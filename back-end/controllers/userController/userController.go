package userController

import (
	"JoaoVMansur/Korean-Portuguese-vocab/auth"
	"JoaoVMansur/Korean-Portuguese-vocab/repositories/userRepository"
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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

	err = bcrypt.CompareHashAndPassword([]byte(user.PassWord), []byte(passWord))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Password or User Invalid"})
		return
	}

	tokenString, err := auth.CreateToken(user.Email, user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"userName": user.UserName,
		"email":    user.Email,
		"userID":   user.ID,
	})
}
func LogOut(c *gin.Context) {
	c.SetCookie("Authorization", "", -1, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logged out"})
}

func SignUp(c *gin.Context, db *gorm.DB) {
	var user schemas.User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.PassWord), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadGateway, err.Error())
		return
	}
	user.PassWord = string(hashedPassword)
	userID, err := userRepository.CreateUser(db, &user)

	if err != nil {
		c.JSON(http.StatusBadGateway, err.Error())
	}

	c.JSON(http.StatusCreated, userID)

}

func EditUser(c *gin.Context, db *gorm.DB) {
	var user schemas.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := userRepository.UpdateUser(db, &user)
	if err != nil {
		c.JSON(http.StatusBadGateway, err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User Updated"})
}

func ValidateToken(c *gin.Context) {

	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Token Not Found",
		})
		return
	}
	claims, err := auth.VerifyToken(tokenString)
	if err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Token",
		})
		return
	}
	exp, ok := claims["exp"].(float64)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Token Format",
		})
		return
	}
	now := float64(time.Now().Unix())
	if now > exp {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Token Expired",
		})
		return
	}
	email := claims["email"].(string)
	userID := uint(claims["userID"].(float64))

	c.JSON(http.StatusOK, gin.H{
		"message": "Token Validated",
		"email":   email,
		"userID":  userID,
	})

}
