package storage

import (
	"path"
	"ta-de-rosca/screenshotstorage/src/domain/providers"
)

// SaveFile usecase is reponsible to save a new file
type SaveFile struct {
	directory       string
	storageProvider providers.Storage
}

// NewSaveFile create a saveFile usecase
func NewSaveFile(directory string, storageProvider providers.Storage) *SaveFile {
	return &SaveFile{
		directory:       directory,
		storageProvider: storageProvider,
	}
}

// Save save a new file
func (sf *SaveFile) Save(file []byte, filename string) (string, error) {
	fullPath := path.Join(sf.directory, filename)
	err := sf.storageProvider.Store(fullPath, file)
	if err != nil {
		return "", err
	}
	return fullPath, nil
}
