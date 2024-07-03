package account

import (
	"context"
	"testing"
)

func ListAccount(t *testing.T) {
	service := NewService(nil)

	//Success Retrieval
	t.Run("Success", func(t *testing.T) {
		ctx := context.Background()
		id := "12345"

		account, err := service.GetAccount(ctx, id)
		if err == nil {
			t.Errorf("Expected no error, got %v", err)
		}
		if account == nil {
			t.Error("Expected non-nil account, got nil")
		}
	})
}
