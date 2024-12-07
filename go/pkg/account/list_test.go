package account

import (
	"context"
	"testing"
)

func GetAccount(t *testing.T) {
	service := NewService(nil)

	//Success Retrieval
	t.Run("Success Retrieval", func(t *testing.T) {
		ctx := context.Background()

		accounts, err := service.ListAccounts(ctx)
		if err == nil {
			t.Errorf("Expected no error, got %v", err)
		}
		if accounts == nil {
			t.Error("Expected non-nil accounts slice, got nil")
		}
	})

	//Context Cancelled
	t.Run("Context Cancelled", func(t *testing.T) {
		ctx, cancel := context.WithCancel(context.Background())
		cancel() // Cancel context immediately

		accounts, err := service.ListAccounts(ctx)
		if err == nil {
			t.Errorf("Expected no error, got %v", err)
		}
		if accounts == nil {
			t.Error("Expected non-nil accounts slice, got nil")
		}
	})
}
