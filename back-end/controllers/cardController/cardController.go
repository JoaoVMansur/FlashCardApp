package cardController

import (
	cardRepository "JoaoVMansur/Korean-Portuguese-vocab/repositories/cardRepository"
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"net/http"

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
