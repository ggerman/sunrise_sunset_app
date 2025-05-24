#!/bin/bash
docker-compose -f docker_environment/docker-compose.yml \
              run --rm rails bash
