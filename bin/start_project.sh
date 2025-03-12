#!/usr/bin/env bash

run_ruby_on_rails() {
    # Exit immediately if a command exits with a non-zero status
    set -e

    if [ "$RAILS_ENV" != production ] && [ "$RAILS_ENV" != stage ]; then

    # Include environment variables from .env
    export $(cat .env | grep -v ^# | xargs)

    ## Wait for postgres db to be ready  for connections
    until PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U "$POSTGRES_USER" -c '\l'; do
        echo "=========> Postgres is unavailable - sleeping"
        sleep 1
    done

    fi

    echo "=========> Postgres is up - continuing with commands"
    cd /app
    rm -f tmp/pids/server.pid

    bundle install
    # Create DB
    bundle exec rake db:create RAILS_ENV=$RAILS_ENV
    bundle exec rake db:migrate RAILS_ENV=$RAILS_ENV

    if [ "$RAILS_ENV" = "development" ]; then
    echo "=========> Starting dev server"
    bundle exec foreman start -f Procfile.dev
    exec tail -f log/development.log
    else
    rake assets:precompile
    echo "=========> Starting puma"
    bundle exec puma -C config/puma.rb -d
    echo "=========> Starting nginx"
    exec nginx -g 'daemon off;'
    fi
}

project_dir="."

if [ -f "$project_dir/Gemfile.lock" ] && grep -q "rails" "$project_dir/Gemfile.lock"; then
    run_ruby_on_rails
else
    rails new . --database=postgresql
    bundle add foreman
    echo "web: bin/rails server -p 3000 -b 0.0.0.0" > /app/Procfile.dev
    cp /app/tmp/database.yml /app/config/
    bundle install
    run_ruby_on_rails
fi

