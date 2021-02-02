package storage

import (
	"reflect"
	fakes "ta-de-rosca/screenshotstorage/src/domain/tests/fakes/providers"
	"testing"
)

func TestReadFile(t *testing.T) {
	t.Run("should call provider with correct path", func(t *testing.T) {
		fakeStorage := &fakes.FakeStorage{}
		NewReadFile("/test", fakeStorage).Read("foo.jpg")
		expected := "/test/foo.jpg"
		if fakeStorage.CallPath != expected {
			t.Errorf("expected %q got %q", expected, fakeStorage.CallPath)
		}
	})

	t.Run("should return data about readed file", func(t *testing.T) {
		fakeStorage := &fakes.FakeStorage{}
		file, extension, _ := NewReadFile("/test", fakeStorage).Read("foo.jpg")
		expected := "jpg"
		if !reflect.DeepEqual(file, []byte{13}) {
			t.Errorf("wrong data file")
		}
		if extension != expected {
			t.Errorf("expected %q got %q", expected, extension)
		}
	})

	t.Run("should return error result when provider returns error", func(t *testing.T) {
		fakeStorage := &fakes.FakeStorage{}
		file, extension, err := NewReadFile("/test", fakeStorage).Read("force_error.jpg")
		if file != nil {
			t.Errorf("file bytes should be nil when an error occurs")
		}
		if extension != "" {
			t.Errorf("extension should be nil when an error occurs")
		}
		if err == nil {
			t.Errorf("expect an error returned by provider")
		}
	})
}
