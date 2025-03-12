#!/bin/bash
docker-compose -f docker_environment/docker-compose.yml \
               run --rm -e RAILS_ENV=test rails \
               sh -c "bundle exec rake db:create; bundle exec rake db:migrate; bundle exec rake assets:precompile; bundle exec rspec ${@}"
