package cardController

import (
	"JoaoVMansur/Korean-Portuguese-vocab/auth"
	cardRepository "JoaoVMansur/Korean-Portuguese-vocab/repositories/cardRepository"
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCards(c *gin.Context, db *gorm.DB) {
	cards, err := cardRepository.GetAllCards(db)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Internal Server Error",
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, cards)
}

func AddCard(c *gin.Context, db *gorm.DB) {
	var card schemas.Card
	if err := c.BindJSON(&card); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if card.CollectionID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Collection ID is required"})
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

	var collection schemas.Collection
	result := db.Where("id = ? AND user_id = ?", card.CollectionID, userID).First(&collection)
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Collection não pertence ao usuário"})
		return
	}

	cardId, err := cardRepository.AddCard(db, &card)
	if err != nil {
		if customErr, ok := err.(*cardRepository.CardAlreadyAddedError); ok && customErr.Status == 406 {
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
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "card added succesfully",
		"cardID":  cardId,
	})
}
func DeleteCard(c *gin.Context, db *gorm.DB) {
	cardId, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	err = cardRepository.DeleteCard(db, uint(cardId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Card deleted successfully"})
}

func EditCard(c *gin.Context, db *gorm.DB) {
	var card schemas.Card
	cardId, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}
	if err := c.BindJSON(&card); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	card.ID = uint(cardId)

	err = cardRepository.EditCard(db, &card)

	if err != nil {
		if customErr, ok := err.(*cardRepository.CardAlreadyAddedError); ok && customErr.Status == 406 {
			c.JSON(http.StatusNotAcceptable, gin.H{
				"error":   "Not Acceptable",
				"message": customErr.Message,
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to edit card", "details": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Card updated successfully", "Card": card})

}
