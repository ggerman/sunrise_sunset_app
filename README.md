# Ruby on Rails Development Environment with Docker

## Complete Article:

[Complete Article](https://rubystacknews.com/2025/03/12/streamline-your-ruby-on-rails-development-with-docker/)


This repository provides a complete Ruby on Rails development environment using Docker. It includes everything needed to start a Rails project: a PostgreSQL database, MailCatcher for email testing, and all necessary dependencies pre-configured.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Testing](#testing)
- [Updating the Environment](#updating-the-environment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
Before using this environment, ensure you have the following installed on your machine:

- **Docker**: Install Docker
- **Docker Compose**: Comes bundled with Docker Desktop or can be installed separately.
- **Git**: For cloning the repository (optional).

## Getting Started
### 1. Clone the Repository
If you haven't already cloned this repository, do so using:

```bash
git clone git@github.com:ggerman/ruby_on_rails_dockerized.git
cd repository-name
```

### 2. Start the Application
Run the following command to start the Rails application:

```bash
./bin/start.sh up
```

#### What Happens During the First Run?
- Builds the Docker containers if they don’t already exist.
- Downloads and sets up a new Ruby on Rails application (if not already present).
- Configures PostgreSQL and MailCatcher.
- Installs all necessary dependencies (`bundle install`, `yarn install`).
- Sets up the database (`db:create`, `db:migrate`).

#### Subsequent Runs
On subsequent runs, the script simply starts the existing containers, allowing you to continue developing your Rails application.

## Available Commands
### 1. Start the Application
Starts the Rails application and all associated services (PostgreSQL, MailCatcher):

```bash
./bin/start.sh up
```

### 2. Access the Rails Container
To access the Rails container's terminal as a bash user:

```bash
./bin/terminal.sh
```

Once inside the container, you can run commands like:
- `rails c`: Start the Rails console.
- `rails dbconsole`: Open the PostgreSQL console.
- `bundle exec rake <task>`: Run custom Rake tasks.

### 3. Run Tests
Execute the complete test suite:

```bash
./bin/test.sh
```

**Notes:**
- Before running tests, ensure you have added `gem "rspec"` to your Gemfile and run `bundle install`.
- To run a specific test file or line, use:

```bash
./bin/test.sh
