# Doctor Point

A modern React-based web application for managing doctor appointments and medical services.

## Features

- User authentication (Login/Register)
- Dashboard interface
- Appointment management
- Modern UI with Tailwind CSS
- Responsive design
- Toast notifications for user feedback
- Real-time appointment updates
- Secure user data management
- Mobile-first approach
- Accessibility compliant

## Tech Stack

- React 18
- Vite 6
- React Router DOM 7
- Tailwind CSS 3
- Jest & React Testing Library
- ESLint & Prettier
- Axios for API calls
- React Toastify for notifications

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Git

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd doctor-point
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration values.

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Doctor Point
VITE_APP_VERSION=1.0.0
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run format` - Format code with Prettier

## Project Structure

```
doctor-point/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── router/        # Routing configuration
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Public static files
└── [config files]     # Various configuration files
```

## Development

### Starting the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Testing

The project uses Jest and React Testing Library for testing. Tests are located alongside their respective components with the `.test.jsx` extension.

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests

Tests should follow these conventions:

- Use descriptive test names
- Follow the "describe" and "it" pattern
- Mock external dependencies
- Use data-testid attributes for element selection

## Code Quality

- ESLint is configured for code linting
- Prettier is used for code formatting
- PropTypes are implemented for type checking
- Pre-commit hooks for code quality checks
- Automated CI/CD pipeline

## API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Appointment Endpoints

- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

## Deployment

### Production Deployment

1. Build the application:

```bash
npm run build
```

2. Deploy the `dist` directory to your hosting service.

### Deployment Platforms

- Vercel (Recommended)
- Netlify
- AWS Amplify
- GitHub Pages

## Troubleshooting

### Common Issues

1. **Installation fails**

   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json
   - Run `npm install` again

2. **Tests failing**

   - Check for outdated dependencies
   - Clear Jest cache: `npm test -- --clearCache`
   - Verify test environment setup

3. **Build errors**
   - Check for environment variables
   - Verify all dependencies are installed
   - Check for TypeScript errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contributing Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## Support

For support, please:

- Check the troubleshooting guide
- Open an issue in the repository
- Contact the development team

## Next Steps

- [ ] Implement social login integration (Google, Facebook)
- [ ] Add video consultation support
- [ ] Implement dark mode
- [ ] Integrate with real API endpoints instead of mock data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the amazing framework
- Vite for the build tool
- All contributors who have helped shape this project

## Development with Cursor IDE

This project was developed using [Cursor IDE](https://cursor.sh), a modern AI-powered code editor that significantly enhanced the development process. Here's how Cursor was utilized:

### Key Features Used

- **AI Pair Programming**: Leveraged Cursor's AI capabilities for:

  - Code generation and completion
  - Bug detection and fixes
  - Documentation generation
  - Test case creation
  - Code refactoring suggestions

- **Intelligent Code Navigation**:

  - Quick file and symbol search
  - Smart code navigation
  - Context-aware code understanding

- **Integrated Development Tools**:
  - Built-in terminal
  - Git integration
  - ESLint and Prettier support
  - Real-time error detection

### Development Workflow with Cursor

1. **Project Setup**:

   - Used Cursor's AI to generate initial project structure
   - Automated dependency management
   - Configuration file generation

2. **Component Development**:

   - AI-assisted component creation
   - Automatic prop type generation
   - Smart component testing

3. **Code Quality**:

   - Real-time linting and formatting
   - AI-powered code review suggestions
   - Automated test generation

4. **Documentation**:
   - AI-generated documentation
   - Automated README updates
   - Code comment generation

### Getting Started with Cursor

1. Download and install [Cursor IDE](https://cursor.sh)
2. Clone this repository
3. Open the project in Cursor
4. Use `Cmd/Ctrl + K` to access AI features
5. Use `Cmd/Ctrl + P` for quick file navigation
