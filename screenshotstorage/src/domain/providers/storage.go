package providers

// Storage represent a way to store a file
type Storage interface {
	Store(filepath string, file []byte) error
	Read(filepath string) ([]byte, error)
}
