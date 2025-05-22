#!/bin/bash
docker-compose --env-file .env -f docker_environment/docker-compose.yml ${@:-up -d --remove-orphans}
