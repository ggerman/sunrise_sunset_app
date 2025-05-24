#!/bin/bash
docker-compose -f docker_environment/docker-compose.yml \
              run --rm react-app sh
