package sdk

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"time"
)

type BaseClient struct {
	httpClient *http.Client
	baseURL    string
	apiKey     string
}

type HTTPMethod string

const (
	GET    HTTPMethod = "GET"
	POST   HTTPMethod = "POST"
	PUT    HTTPMethod = "PUT"
	DELETE HTTPMethod = "DELETE"
)

// NewBaseClient creates a new BaseClient with the provided baseURL and apiKey.
//
// Parameters:
// - baseURL: the base URL for the client.
// - apiKey: the API key for authentication.
// Returns a pointer to the created BaseClient.
func NewBaseClient(apiKey string) *BaseClient {
	return &BaseClient{
		httpClient: &http.Client{Timeout: 10 * time.Second},
		baseURL:    "https://docs.onvo.ai",
		apiKey:     apiKey,
	}
}

func (bc *BaseClient) makeRequest(method HTTPMethod, endpoint string, body interface{}, isForm bool) ([]byte, error) {
	url := fmt.Sprintf("%s%s", bc.baseURL, endpoint)
	var bodyReader io.Reader

	if body != nil {
		if isForm {
			bodyReader = bytes.NewBufferString(body.(string))
		} else {
			jsonBody, err := json.Marshal(body)
			if err != nil {
				return nil, err
			}
			bodyReader = bytes.NewBuffer(jsonBody)
		}
	}

	req, err := http.NewRequest(string(method), url, bodyReader)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Access-Control-Allow-Origin", "*")
	req.Header.Set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")

	if bc.apiKey != "" {
		req.Header.Set("x-api-key", bc.apiKey)
	}

	if !isForm {
		req.Header.Set("Content-Type", "application/json")
	}

	resp, err := bc.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		responseText, _ := io.ReadAll(resp.Body)
		return nil, errors.New(string(responseText))
	}

	return io.ReadAll(resp.Body)
}

func (bc *BaseClient) FetchJSON(method HTTPMethod, endpoint string, body interface{}, isForm bool) (map[string]interface{}, error) {
	// Ensure the method is one of the allowed values
	if method != GET && method != POST && method != PUT && method != DELETE {
		return nil, errors.New("invalid HTTP method")
	}

	responseData, err := bc.makeRequest(method, endpoint, body, isForm)
	if err != nil {
		return nil, err
	}

	var result map[string]interface{}
	if err := json.Unmarshal(responseData, &result); err != nil {
		return nil, err
	}

	return result, nil
}

func (bc *BaseClient) FetchBlob(endpoint string) ([]byte, error) {
	return bc.makeRequest("GET", endpoint, nil, false)
}
