# Onvo

The Onvo package provides a Rust based SDK to seamlessly communicate with the Onvo platform, allowing developers to integrate AI-powered dashboards into their products. This README provides an overview of the package's features, installation, and usage instructions.

## Installation

You can install the package using pip:

```bash
cargo install onvo-ai
```

## Getting Started

To begin using the Onvo package, you'll need an API key from the Onvo platform and an endpoint.

You can store your API key as an environment variable named `ONVO_API_KEY`.

```bash
ONVO_API_KEY="your_api_key"
```

You can store the endpoint as an environment variable named `ONVO_API_ENDPOINT`.

```bash
ONVO_API_ENDPOINT="https://dashboard.onvo.ai/api"
```

## Usage

Here's an example of how to use the package to interact with the Onvo platform:

```rust
from onvo_ai import Onvo

// Initialize the Onvo struct with your API key, will default to ENV variables if not given.
let onvo = Onvo::new(endpoint=Some("https://dashboard.onvo.ai/api"), api_key=Some("your_api_key_here"));

// Get all accounts
let accounts = onvo.accounts();
let result = accounts.list().await;
```

## Library Reference

Feel free to refer to the docstrings of the functions to dig deeper.

## Support

For any issues, questions, or feedback, please contact our support team at info@onvo.ai.

## License

This package is distributed under the MIT License.

Thank you for choosing the Onvo package to integrate AI-powered dashboards from the Onvo platform into your product! We hope this package enhances your development experience and empowers your applications with advanced analytics capabilities.
