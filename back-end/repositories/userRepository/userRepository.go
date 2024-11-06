package userRepository

import (
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"

	"gorm.io/gorm"
)

func GetUser(db *gorm.DB, user *schemas.User) (*schemas.User, error) {

	result := db.Where("user_name = ?", user.UserName).First(user)
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
