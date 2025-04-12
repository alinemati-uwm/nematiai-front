fhfght# Nerd Studio Universal Deployment Guide

This guide explains how to deploy Nerd Studio on any server using Docker.

## Prerequisites

- Docker and Docker Compose installed on the server
- Git installed (to clone the repository)
- Access to the Nerd Studio source code repository

## Deployment Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nerd_studio
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your specific configuration
nano .env
```

### 3. Deploy with Docker Compose

```bash
# Set environment variables for deployment (or put these in your .env file)
export DOCKER_ENV=production  # Options: development, staging, production
export NODE_ENV=production
export PORT=80  # Or any port you want to expose

# Deploy using the universal docker-compose file
docker compose -f docker-compose.universal.yml up -d
```

### 4. Verify Deployment

```bash
# Check if the container is running
docker compose -f docker-compose.universal.yml ps

# Check logs
docker compose -f docker-compose.universal.yml logs
```

## Configuration Options

The universal deployment supports various configuration options:

| Environment Variable | Description | Default |
|---------------------|-------------|---------|
| DOCKER_ENV | The environment folder to use for the Dockerfile | development |
| NODE_ENV | Node.js environment | development |
| PORT | The port to expose on the host | 3000 |
| ENV_FILE | Path to the environment file | .env |

## Common Tasks

### Stopping the Server

```bash
docker compose -f docker-compose.universal.yml down
```

### Restarting the Server

```bash
docker compose -f docker-compose.universal.yml restart
```

### Updating to Latest Code

```bash
git pull
docker compose -f docker-compose.universal.yml build --no-cache
docker compose -f docker-compose.universal.yml up -d
```

### Viewing Logs

```bash
docker compose -f docker-compose.universal.yml logs -f
```

## Scaling (for advanced users)

For high-load scenarios, you might want to use Docker Swarm or Kubernetes with this setup. 
The universal docker-compose file is designed to be compatible with Docker Swarm with minimal modifications.

## Troubleshooting

1. **Container fails to start**: Check the logs with `docker compose -f docker-compose.universal.yml logs`
2. **Can't connect to the application**: Verify that the port mapping is correct and that any firewall allows traffic
3. **Environment variables not working**: Make sure your .env file is properly formatted and loaded

## Security Notes

- Always use strong secrets for all authentication variables
- Consider using Docker secrets for sensitive information in production
- Restrict access to the Docker socket and deployment server