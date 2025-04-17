# DocuMentor

DocuMentor is a Cloudflare Worker-based application designed to provide intelligent documentation and code analysis capabilities. It leverages modern web technologies and AI-powered tools to enhance code understanding and documentation processes.

## Features

- Cloudflare Worker-based architecture for high performance and scalability
- Integration with Firecrawl for web scraping and data extraction
- TypeScript-based development for type safety and better maintainability
- Automated documentation generation
- Testing support with Vitest
- Smart placement capabilities for optimized deployment

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Cloudflare account and Wrangler CLI installed
- Access to Firecrawl API (API key required)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/DocuMentor.git
cd DocuMentor
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.dev.vars` file in the root directory with the following variables:
```
SHARED_SECRET=your_shared_secret
FIRECRAWL_KEY=your_firecrawl_key
BRAVE_KEY=your_brave_key
```

## Development

### Local Development

To start the development server:
```bash
npm run dev
```

This will start the Wrangler development server, allowing you to test the application locally.

### Testing

Run the test suite:
```bash
npm test
```

The project uses Vitest for testing, providing a fast and efficient testing environment.

### Deployment

To deploy the application to Cloudflare Workers:
```bash
npm run deploy
```

This will generate documentation and deploy the worker to Cloudflare.

## Project Structure

```
DocuMentor/
├── src/
│   ├── index.ts           # Main application entry point
│   └── helperFunctions/   # Utility functions and helpers
├── test/                  # Test files
├── .vscode/              # VS Code configuration
├── wrangler.jsonc        # Cloudflare Wrangler configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Configuration

The project is configured through several key files:

- `wrangler.jsonc`: Contains Cloudflare Worker configuration, including environment variables and deployment settings
- `tsconfig.json`: TypeScript configuration for the project
- `.prettierrc`: Code formatting rules
- `.editorconfig`: Editor configuration for consistent coding style

## Environment Variables

The following environment variables are required:

- `SHARED_SECRET`: Used for secure communication
- `FIRECRAWL_KEY`: API key for Firecrawl service
- `BRAVE_KEY`: API key for Brave search service

## Dependencies

### Main Dependencies
- `@mendable/firecrawl-js`: For web crawling and data extraction
- `cheerio`: For HTML parsing
- `mcp-remote`: For remote configuration management
- `workers-mcp`: For Cloudflare Workers configuration

### Development Dependencies
- `@cloudflare/vitest-pool-workers`: Testing framework for Cloudflare Workers
- `@cloudflare/workers-types`: TypeScript types for Cloudflare Workers
- `typescript`: TypeScript compiler
- `vitest`: Testing framework
- `wrangler`: Cloudflare Workers CLI tool

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Cloudflare Workers for providing the serverless platform
- Firecrawl for web scraping capabilities
- All contributors who have helped shape this project 