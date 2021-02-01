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
func (n NativeStorage) Store(filepath string, file []byte) {
	dir := path.Dir(filepath)
	os.MkdirAll(dir, 0777)
	ioutil.WriteFile(filepath, file, 0777)
}
