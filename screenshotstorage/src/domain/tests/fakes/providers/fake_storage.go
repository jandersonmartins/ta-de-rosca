package fakes

import (
	"errors"
	"strings"
)

// FakeStorage used to unit test file store
type FakeStorage struct {
	CallPath string
	CallFile []byte
}

// Store act as a spy
func (fs *FakeStorage) Store(filepath string, file []byte) error {
	fs.CallFile = file
	fs.CallPath = filepath
	return nil
}

func (fs *FakeStorage) Read(filepath string) ([]byte, error) {
	if strings.Contains(filepath, "force_error.jpg") {
		return nil, errors.New("forced error")
	}
	fs.CallPath = filepath
	return []byte{13}, nil
}
