package providers

import (
	"io/ioutil"
	"os"
	"path"
)

// NativeStorage implements a native way to store files
type NativeStorage struct{}

// NewNativeStorage returns a NativeStorage instance
func NewNativeStorage() *NativeStorage {
	return &NativeStorage{}
}

// Store save a file using native io
func (n NativeStorage) Store(filepath string, file []byte) (err error) {
	dir := path.Dir(filepath)
	err = os.MkdirAll(dir, 0777)
	if err != nil {
		return
	}
	err = ioutil.WriteFile(filepath, file, 0777)
	if err != nil {
		return
	}
	return
}
