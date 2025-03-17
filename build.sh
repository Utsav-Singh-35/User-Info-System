#!/usr/bin/env bash
# exit on error
set -o errexit

# Make build.sh executable
chmod +x build.sh

# Install dependencies
pip install -r requirements.txt

# Collect static files
python form/manage.py collectstatic --no-input

# Apply migrations
python form/manage.py migrate 