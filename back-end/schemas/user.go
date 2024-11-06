package schemas

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserName string
	PassWord string
	Words    []Word
}
