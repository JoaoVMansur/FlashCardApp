package middleware

import (
	"JoaoVMansur/Korean-Portuguese-vocab/auth"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func RequireAuth(c *gin.Context) {

	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	claims, err := auth.VerifyToken(tokenString)
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	exp := claims["exp"].(float64)
	now := float64(time.Now().Unix())
	if now > exp {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	userID := uint(claims["userID"].(float64))
	email := claims["email"].(string)
	c.Set("userID", userID)
	c.Set("email", email)

	c.Next()
}
