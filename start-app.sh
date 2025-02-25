#!/bin/sh

# Start JSON Server in the background

echo "Starting JSON Server..."
npx json-server --watch db.json --host 0.0.0.0 --port 3000 &

# Start Angular app in the foreground

echo "Starting Angular app..."
npm start -- --host 0.0.0.0 --poll=2000