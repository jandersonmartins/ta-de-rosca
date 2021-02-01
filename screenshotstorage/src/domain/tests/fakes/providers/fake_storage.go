package fakes

// FakeStorage used to unit test file store
type FakeStorage struct {
	CallPath string
	CallFile []byte
}

// Store act as a spy
func (fs *FakeStorage) Store(filepath string, file []byte) {
	fs.CallFile = file
	fs.CallPath = filepath
}
