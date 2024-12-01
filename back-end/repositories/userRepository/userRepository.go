package userRepository

import (
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"fmt"

	"gorm.io/gorm"
)

func GetUser(db *gorm.DB, user *schemas.User) (*schemas.User, error) {

	result := db.Where("email = ?", user.Email).First(user)
	if result.Error != nil {
		return nil, result.Error
	}

	return user, nil
}

func CreateUser(db *gorm.DB, user *schemas.User) (uint, error) {
	result := db.Create(&user)
	if result.Error != nil {
		return 0, result.Error
	}
	return user.ID, nil
}

func UpdateUser(db *gorm.DB, user *schemas.User) error {
	var currentUser schemas.User

	result := db.First(&currentUser, user.ID)
	if result.Error != nil {
		return result.Error
	}

	var existingUser schemas.User
	if err := db.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return fmt.Errorf("email already in use")
	}

	updateResult := db.Model(&currentUser).Updates(user)
	if updateResult.Error != nil {
		return updateResult.Error
	}

	return nil
}
