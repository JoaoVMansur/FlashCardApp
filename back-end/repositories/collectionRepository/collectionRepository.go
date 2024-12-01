package collectionRepository

import (
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"fmt"

	"gorm.io/gorm"
)

type CollectionAlreadyExistsError struct {
	Status  int
	Message string
}

func (e *CollectionAlreadyExistsError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Status, e.Message)
}

func GetCollections(db *gorm.DB, userId uint) ([]schemas.Collection, error) {
	collections := []schemas.Collection{}
	user := schemas.User{}

	result := db.Where("id = ?", userId).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	err := db.Model(&schemas.Collection{}).
		Preload("Cards").
		Where("user_id = ?", userId).
		Find(&collections).Error
	if err != nil {
		return nil, err
	}

	return collections, nil
}
func GetCollection(db *gorm.DB, userId uint, collectionId uint) (schemas.Collection, error) {
	collection := schemas.Collection{}
	result := db.Where("id = ? AND user_id = ?", collectionId, userId).First(&collection)
	err := db.Preload("Cards").Where("id = ? AND user_id = ?", collectionId, userId).First(&collection).Error
	if err != nil {
		return collection, err
	}
	if result.Error != nil {
		return collection, result.Error
	}
	return collection, nil
}

func CreateCollection(db *gorm.DB, collection *schemas.Collection) (uint, error) {
	user := schemas.User{}
	result := db.Where("id = ?", collection.UserID).First(&user)
	if result.Error != nil {
		return 0, result.Error
	}

	var existingCollection schemas.Collection
	if err := db.Where("user_id = ? AND collection_name = ?", collection.UserID, collection.CollectionName).First(&existingCollection).Error; err == nil {
		return 0, &CollectionAlreadyExistsError{
			Status:  406,
			Message: "Collection already exists",
		}
	}

	result = db.Create(&collection)
	if result.Error != nil {
		return 0, result.Error
	}
	return collection.ID, nil
}

func DeleteCollection(db *gorm.DB, userId uint, collectionId uint) error {
	return db.Where("id = ? AND user_id = ?", collectionId, userId).Delete(&schemas.Collection{}).Error
}

func UpdateCollection(db *gorm.DB, collection *schemas.Collection) error {
	var currentCollection schemas.Collection

	result := db.First(&currentCollection, collection.ID)
	if result.Error != nil {
		return result.Error
	}

	var collectionCheck schemas.Collection
	if err := db.Where("collection_name = ? AND user_id = ?", collection.CollectionName, collection.UserID).First(&collectionCheck).Error; err == nil {
		return fmt.Errorf("a collection with this name already exists")
	}

	currentCollection.CollectionName = collection.CollectionName
	if err := db.Save(&currentCollection).Error; err != nil {
		return err
	}

	return nil
}
