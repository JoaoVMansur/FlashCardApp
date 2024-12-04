package cardRepository

import (
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"fmt"

	"gorm.io/gorm"
)

type CardAlreadyAddedError struct {
	Status  int
	Message string
}

func (e *CardAlreadyAddedError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Status, e.Message)
}

func GetAllCards(db *gorm.DB) ([]schemas.Card, error) {
	cards := []schemas.Card{}
	result := db.Find(&cards)

	if result.Error != nil {
		return nil, result.Error
	}
	return cards, nil
}

func AddCard(db *gorm.DB, card *schemas.Card) (uint, error) {

	var duplicada schemas.Card
	if err := db.Where("front = ? AND collection_id = ?", card.Front, card.CollectionID).First(&duplicada).Error; err == nil {
		return 0, &CardAlreadyAddedError{
			Status:  406,
			Message: "Card already added",
		}
	}

	result := db.Create(&card)
	if result.Error != nil {
		return 0, result.Error
	}
	return card.ID, nil
}

func DeleteCard(db *gorm.DB, cardID uint) error {
	result := db.Delete(&schemas.Card{}, cardID)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func EditCard(db *gorm.DB, card *schemas.Card) error {
	var currentCard schemas.Card
	var duplicada schemas.Card
	if err := db.Where("front = ? AND collection_id = ?", card.Front, card.CollectionID).First(&duplicada).Error; err == nil {
		return &CardAlreadyAddedError{
			Status:  406,
			Message: "Card Front already beeing used",
		}
	}
	if err := db.Where("id = ? AND collection_id = ?", card.ID, card.CollectionID).First(&currentCard).Error; err != nil {
		return err
	}
	currentCard.Front = card.Front
	currentCard.Verse = card.Verse
	if err := db.Save(&currentCard).Error; err != nil {
		return err
	}
	return nil
}
