#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Navigate to project directory
cd form

# Collect static files
python manage.py collectstatic --no-input

# Apply migrations
python manage.py migrate 