package schemas

import "gorm.io/gorm"

type Word struct {
	gorm.Model
	UserId         uint
	User           User
	KoreanWord     string
	PortugueseWord string
}
