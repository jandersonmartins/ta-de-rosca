package storage

import (
	"io/ioutil"
	"os"
	"path"
	config "ta-de-rosca/screenshotstorage/src/config"
)

type saveFile struct{}

func NewSaveFile() *saveFile {
	return &saveFile{}
}

func (sf *saveFile) PrepareDir() string {
	dirPath := config.GetScreenshotDir()
	// TODO: handle MkdirAll error
	os.MkdirAll(dirPath, 0777)
	return dirPath
}

func (sf *saveFile) Save(file []byte, filename string) string {
	directory := sf.PrepareDir()
	filePath := path.Join(directory, filename)
	// TODO: handle WriteFile error
	ioutil.WriteFile(filePath, file, 0777)
	return filePath
}
