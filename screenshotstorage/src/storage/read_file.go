package storage

import (
	"io/ioutil"
	"path"
	"strings"
	config "ta-de-rosca/screenshotstorage/src/config"
)

type readFile struct{}

func NewReadFile() *readFile {
	return &readFile{}
}

func (rf *readFile) Read(fileName string) ([]byte, string, error) {
	dir := config.GetScreenshotDir()
	fullPath := path.Join(dir, fileName)
	file, err := ioutil.ReadFile(fullPath)
	if err != nil {
		return nil, "", err
	}
	extension := rf.GetExtension(fileName)
	return file, extension, nil
}

func (rf *readFile) GetExtension(fileName string) string {
	return strings.Split(fileName, ".")[1]
}
