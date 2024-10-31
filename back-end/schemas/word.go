package schemas

import "gorm.io/gorm"

type Word struct {
	gorm.Model
	KoreanWord     string
	PortugueseWord string
}
