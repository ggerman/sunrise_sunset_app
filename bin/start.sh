#!/bin/bash
docker-compose -f docker_environment/docker-compose.yml ${@:-up -d --remove-orphans}
