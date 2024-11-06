package wordRepository

import (
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"fmt"

	"gorm.io/gorm"
)

type WordAlreadyAddedError struct {
	Status  int
	Message string
}

func (e *WordAlreadyAddedError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Status, e.Message)
}

func GetAllWords(db *gorm.DB) ([]schemas.Word, error) {
	words := []schemas.Word{}
	result := db.Find(&words)

	if result.Error != nil {
		return nil, result.Error
	}
	return words, nil
}

func AddWord(db *gorm.DB, word *schemas.Word) (uint, error) {

	var duplicada schemas.Word
	if err := db.Where("korean_word = ?", word.KoreanWord).First(&duplicada).Error; err == nil {

		return 0, &WordAlreadyAddedError{
			Status:  406,
			Message: "Word Already Added",
		}
	}

	result := db.Create(&word)
	if result.Error != nil {
		return 0, result.Error
	}
	return word.ID, nil
}
