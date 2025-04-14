package account

import (
	"context"
	"encoding/json"
	"fmt"

	sdk "github.com/SirPhemmiey/sdks/pkg"
)

// listAccounts retrieves a list of accounts by making an HTTP GET request to the specified API endpoint,
// using the base URL and API key for authentication. It then converts the response into an array of Account objects.
//
// Returns:
// - []Account: Array of Account objects.
// - error: An error if any occurred during the process.
func (s *Service) ListAccounts(ctx context.Context) ([]*Account, error) {

	// Check if context has been cancelled
	if ctx.Err() != nil {
		return nil, fmt.Errorf("context canceled: %v", ctx.Err())
	}

	response, err := s.baseClient.FetchJSON(sdk.GET, "/api/accounts", nil, false)
	if err != nil {
		return nil, err
	}

	// Convert the response into an array of Account objects
	responseBytes, err := json.Marshal(response["accounts"])
	if err != nil {
		return nil, err
	}

	var accounts []*Account
	err = json.Unmarshal(responseBytes, &accounts)
	if err != nil {
		return nil, err
	}

	return accounts, nil

}
