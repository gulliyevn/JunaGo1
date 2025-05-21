# JunaGo

Modern React application with TypeScript, Redux Toolkit, and best practices.

## Features

- 🚀 Modern React with TypeScript
- 📦 Redux Toolkit for state management
- 🎨 SCSS Modules for styling
- 🔍 ESLint + Prettier for code quality
- 🧪 Jest + React Testing Library for testing
- 📱 Responsive design
- 🔒 Authentication system
- 🌐 Internationalization
- 🎯 Code splitting
- 📊 Performance optimization
- 🔄 CI/CD with GitHub Actions
- 🐳 Docker support

## Prerequisites

- Node.js 16.x or later
- npm 7.x or later

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/junago.git
cd junago
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm lint` - Run ESLint
- `npm lint:fix` - Fix ESLint errors
- `npm format` - Format code with Prettier

## Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable components
├── config/        # Configuration files
├── constants/     # Constants and enums
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API services
├── store/         # Redux store
├── styles/        # Global styles
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Building for Production

```bash
# Build the app
npm run build

# Build and run with Docker
docker-compose up --build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Docker](https://www.docker.com/) 