# Contribution Guidelines

Thank you for considering contributing to the Resume Builder Monorepo project! We welcome contributions from the community and are excited to work with you. Please follow these guidelines to ensure a smooth and efficient contribution process.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Development Setup](#development-setup)
4. [Submitting Changes](#submitting-changes)
5. [Code Style](#code-style)
6. [Testing](#testing)
7. [Documentation](#documentation)
8. [Issue Reporting](#issue-reporting)
9. [Pull Request Process](#pull-request-process)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for everyone.

## How to Contribute

1. **Fork the repository**: Click the "Fork" button at the top right corner of the repository page to create a copy of the repository in your GitHub account.
2. **Clone your fork**: Clone the forked repository to your local machine using the following command:
   ```sh
   git clone https://github.com/your-username/resume-builder-monorepo.git
   ```
3. **Create a new branch**: Create a new branch for your contribution using the following command:
   ```sh
   git checkout -b feature/your-feature-name
   ```

## Development Setup

Follow the instructions in the [Development Environment Guide](development.md) to set up your development environment.

## Submitting Changes

1. **Commit your changes**: Commit your changes with a clear and descriptive commit message using the following command:
   ```sh
   git commit -m "Add feature: your feature description"
   ```
2. **Push your changes**: Push your changes to your forked repository using the following command:
   ```sh
   git push origin feature/your-feature-name
   ```
3. **Create a pull request**: Create a pull request from your forked repository to the main repository. Provide a clear and detailed description of your changes and the problem they solve.

## Code Style

Please follow the code style guidelines defined in our ESLint and Prettier configurations. You can run the following commands to lint and format your code:

- **Lint**: `npm run lint`
- **Format**: `npm run format`

## Testing

Ensure that your changes are well-tested. Follow the instructions in the [Testing Guide](testing.md) to run the tests. Add new tests as needed to cover your changes.

## Documentation

Update the documentation to reflect your changes. This includes updating the relevant sections in the [API Reference](api-reference.md), [Development Environment Guide](development.md), and any other relevant documentation files.

## Issue Reporting

If you encounter any issues or have suggestions for improvements, please open an issue in the repository. Provide a clear and detailed description of the issue or suggestion.

## Pull Request Process

1. Ensure that your changes pass all tests and adhere to the code style guidelines.
2. Provide a clear and detailed description of your changes in the pull request.
3. Address any feedback or comments from the maintainers.
4. Once your pull request is approved, it will be merged into the main repository.

Thank you for contributing to the Resume Builder Monorepo project!
