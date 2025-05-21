# JunaGO - Educational Platform

## Project Architecture

JunaGO is a modern React-based educational platform built with a clean architecture that separates concerns and promotes maintainability.

## 📋 Architecture Overview

```
JunaGO
├── 📁 src/                      # Source code
│   ├── 📁 assets/              # Static assets like images, icons
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 common/          # Shared components (buttons, inputs, etc.)
│   │   ├── 📁 layout/          # Layout components (header, footer)
│   │   ├── 📁 Feature/         # Feature-specific components
│   ├── 📁 contexts/            # React contexts for state management
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 pages/               # Page components
│   ├── 📁 services/            # API services and data providers
│   ├── 📁 styles/              # Global styles and CSS modules
│   ├── 📁 utils/               # Utility functions
│   ├── 📁 i18n/                # Internationalization
│   ├── 📁 types/               # TypeScript type definitions
│   ├── 📁 store/               # State management
│   ├── 📁 features/            # Feature-specific code
│   ├── 📁 config/              # Configuration files
│   ├── 📁 constants/           # Constants and enums
│   ├── 📄 App.js               # Main application component
│   └── 📄 index.js             # Application entry point
├── 📁 public/                   # Public assets
│   ├── 📁 assets/              # Public static assets
│   └── 📄 index.html           # HTML entry point
└── 📄 package.json              # Dependencies and scripts
```

## 🏛️ Architectural Patterns

### Component Architecture

The application follows a component-based architecture with these types of components:

1. **Page Components** (`src/pages/`)
   - Top-level components representing full pages
   - Handle routing and composition of smaller components
   - Example: `CourseDetail.js`, `StudentDashboard.js`

2. **Layout Components** (`src/components/layout/`)
   - Define the structure of the application
   - Include `MainLayout.tsx`, `MainHeader.tsx`, and `Footer.tsx`
   - Provide consistent UI structure across pages

3. **Feature Components** (`src/components/*/`)
   - Domain-specific components organized by feature
   - Example: `Courses/`, `Hero/`, `Features/`

4. **Common Components** (`src/components/common/`)
   - Reusable UI elements used across the application
   - Example: `Button.tsx`, `ProtectedRoute.js`

### State Management

1. **Context API** (`src/contexts/`)
   - Application uses React Context for global state management
   - Key contexts:
     - `AuthContext.js` - Authentication state
     - `ThemeContext.js` - Light/dark theme settings
     - `ChatbotContext.jsx` - Chatbot functionality

2. **Custom Hooks** (`src/hooks/`)
   - Encapsulate and reuse stateful logic
   - Example: `useAuth.ts`, `useTranslationService.js`

### Data Flow

```
User Interaction → Component → Context/Hooks → Services → External APIs
```

- Components handle user interactions
- Context/Hooks manage state and business logic
- Services interact with external data sources
- Data flows back through the same channels to update the UI

### Module Structure

The application follows a feature-based organization:

- Core modules (auth, navigation, theming)
- Feature modules (courses, workspace, community)
- Supporting modules (i18n, utilities)

## 🚀 Key Technical Features

1. **Routing** - React Router for navigation
2. **Internationalization** - Multi-language support through i18n
3. **Theming** - Dynamic light/dark mode
4. **Authentication** - User login/registration with protected routes
5. **Responsive Design** - Mobile-first approach
6. **TypeScript Integration** - Type safety for components

## 🔧 Technologies Used

- **Frontend Framework**: React
- **Type Checking**: TypeScript
- **Styling**: CSS Modules, SCSS
- **Internationalization**: i18next
- **State Management**: React Context API
- **Build Tool**: Create React App with Craco
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## 🔒 Security Architecture

- Protected routes for authenticated content
- Role-based access control
- Secure authentication flow

## 🌐 Deployment Architecture

The application is containerized using Docker, making it easy to deploy to any environment.

```
Docker Container
├── Nginx (Web Server)
├── React Application (Static Files)
└── Configuration
```

## 📦 Service Integration

- Authentication service
- Course content delivery
- Interactive workspace
- User dashboard

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/gulliyevn/JunaGo1.git

# Install dependencies
npm install

# Start development server
npm start
```

## 📝 Development Guidelines

- Component-first approach
- TypeScript for type safety
- CSS Modules for component styling
- Context API for state management
- Feature-based code organization

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

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm lint` - Run ESLint
- `npm lint:fix` - Fix ESLint errors
- `npm format` - Format code with Prettier

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