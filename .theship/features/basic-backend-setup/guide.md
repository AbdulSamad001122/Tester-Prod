# Implementation Guide: Basic backend setup

## Problem Statement
Implement a minimal health‑check endpoint and MongoDB connection for a Node.js/Express service.

## Success Metrics
- The `/health` endpoint must respond in less than 100 ms for 99 % of requests under normal load.
- The server uptime diagnostic (process running) should be confirmed manually via curl to `/health`.
- The MongoDB connection log should indicate a successful connection at startup when the variable is set.
- Server logs should include the listening port number after startup.

## User Stories
- As a developer, I want a GET `/health` endpoint that returns `{"status":"Ok"}` so I can confirm the service is running.
- As a DevOps engineer, I need the service to listen on the port defined in `.env` (default 5000) without any additional features.
- As a backend engineer, I want a MongoDB connection to be established at startup so data persistence is available for future routes.
