package collectionController

import (
	"JoaoVMansur/Korean-Portuguese-vocab/auth"
	"JoaoVMansur/Korean-Portuguese-vocab/repositories/collectionRepository"
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateCollections(c *gin.Context, db *gorm.DB) {

	collection := schemas.Collection{}
	if err := c.BindJSON(&collection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}
	claims, err := auth.VerifyToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}
	collection.UserID = uint(claims["userID"].(float64))

	id, err := collectionRepository.CreateCollection(db, &collection)
	if err != nil {
		if customErr, ok := err.(*collectionRepository.CollectionAlreadyExistsError); ok {
			c.JSON(http.StatusNotAcceptable, gin.H{
				"error":   "Not Acceptable",
				"message": customErr.Message,
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Internal Server Error",
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"id": id})
}

func GetAllCollectionsFromUser(c *gin.Context, db *gorm.DB) {
	var user schemas.User
	var err error

	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}
	claims, err := auth.VerifyToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}

	userIdUint64 := uint(claims["userID"].(float64))

	user.ID = uint(userIdUint64)

	collections, err := collectionRepository.GetCollections(db, user.ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"collections": collections})
}

func GetCollection(c *gin.Context, db *gorm.DB) {
	collectionID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}

	claims, err := auth.VerifyToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}

	userID := uint(claims["userID"].(float64))

	collection, err := collectionRepository.GetCollection(db, userID, uint(collectionID))
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Coleção não encontrada"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"collection": collection})
}
func DeleteCollection(c *gin.Context, db *gorm.DB) {
	collectionID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}
	claims, err := auth.VerifyToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}
	userID := uint(claims["userID"].(float64))

	err = collectionRepository.DeleteCollection(db, userID, uint(collectionID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}
func EditCollection(c *gin.Context, db *gorm.DB) {

	var collection schemas.Collection

	if err := c.BindJSON(&collection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	collectionID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	collection.ID = uint(collectionID)

	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}
	claims, err := auth.VerifyToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	collection.UserID = uint(claims["userID"].(float64))

	err = collectionRepository.UpdateCollection(db, &collection)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to edit collection", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Collection updated successfully", "collection": collection})
}
