// Package account provides functions and types to interact with account-related operations.
package account

import (
	"time"

	sdk "github.com/SirPhemmiey/sdks/pkg"
)

type Service struct {
	baseClient *sdk.BaseClient
}

func NewService(baseClient *sdk.BaseClient) *Service {
	return &Service{baseClient: baseClient}
}

type AccountClient struct {
	baseClient *sdk.BaseClient
}

// Error represents a custom error structure
type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewError(code int, message string) *Error {
	return &Error{Code: code, Message: message}
}

func NewAccountClient(apiKey string) *AccountClient {
	baseClient := sdk.NewBaseClient(apiKey)
	return &AccountClient{baseClient: baseClient}
}

type Account struct {
	AvatarURL   string    `json:"avatar_url,omitempty"`
	Email       string    `json:"email,omitempty"`
	FullName    string    `json:"full_name,omitempty"`
	ID          string    `json:"id"`
	PhoneNumber string    `json:"phone_number,omitempty"`
	UpdatedAt   time.Time `json:"updated_at,omitempty"`
}
