package storage

import (
	"reflect"
	fakes "ta-de-rosca/screenshotstorage/src/domain/tests/fakes/providers"
	"testing"
)

func TestSaveFile(t *testing.T) {
	t.Run("should return filepath", func(t *testing.T) {
		result, _ := NewSaveFile("/test", &fakes.FakeStorage{}).Save([]byte{}, "foo.jpg")
		expected := "/test/foo.jpg"
		if result != expected {
			t.Errorf("expected %q got %q", expected, result)
		}
	})

	t.Run("should call provider", func(t *testing.T) {
		byteInput := []byte{12}
		fakeStorage := &fakes.FakeStorage{}
		NewSaveFile("/test", fakeStorage).Save(byteInput, "foo.jpg")
		expectedCallPath := "/test/foo.jpg"
		if fakeStorage.CallPath != expectedCallPath {
			t.Errorf("wrong path call. expected %q got %q", expectedCallPath, fakeStorage.CallPath)
		}
		if !reflect.DeepEqual(fakeStorage.CallFile, byteInput) {
			t.Error("wrong file call")
		}
	})
}
