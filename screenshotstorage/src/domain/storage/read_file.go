package storage

import (
	"path"
	"strings"
	"ta-de-rosca/screenshotstorage/src/domain/providers"
)

// ReadFile usecase is reponsible to read a file
type ReadFile struct {
	directory       string
	storageProvider providers.Storage
}

// NewReadFile returns a new readFile "instance"
func NewReadFile(directory string, storageProvider providers.Storage) *ReadFile {
	return &ReadFile{
		directory:       directory,
		storageProvider: storageProvider,
	}
}

func (rf *ReadFile) Read(fileName string) ([]byte, string, error) {
	fullPath := path.Join(rf.directory, fileName)
	file, err := rf.storageProvider.Read(fullPath)
	if err != nil {
		return nil, "", err
	}
	extension := rf.getExtension(fileName)
	return file, extension, nil
}

func (rf *ReadFile) getExtension(fileName string) string {
	return strings.Split(fileName, ".")[1]
}
