package account

import (
	"context"
	"encoding/json"
	"fmt"

	sdk "github.com/SirPhemmiey/sdks/pkg"
)

func (s *Service) GetAccount(ctx context.Context, id string) (*Account, error) {

	// Check if context has been cancelled
	if ctx.Err() != nil {
		return nil, fmt.Errorf("context canceled: %v", ctx.Err())
	}

	response, err := s.baseClient.FetchJSON(sdk.GET, "/api/accounts/"+id, nil, false)
	if err != nil {
		return nil, err
	}

	// Convert the response into an array of Account objects
	responseBytes, err := json.Marshal(response["accounts"])
	if err != nil {
		return nil, err
	}

	var account Account
	err = json.Unmarshal(responseBytes, &account)
	if err != nil {
		return nil, err
	}

	return &account, nil

}
