# RMG Incident Management - Angular 20 Frontend

## Requirements
- Node.js 20.19+ (or compatible Angular 20 Node version)
- npm
- Backend running at http://localhost:8080

## Install
npm install

## Run
npm start

Open:
http://localhost:4200

## Features
- Login / JWT interceptor
- Registration
- Forgot password
- Reset password
- Protected incident routes
- Incident list with status/priority filters and pagination
- Create incident
- PIN code lookup through Spring Boot
- Automatic City/District and Country population
- Incident details
- Incident status update
- Angular Material UI

## Backend dependency
The frontend expects these endpoints:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET /api/location/pincode/{pin}
POST /api/incidents
GET /api/incidents
GET /api/incidents/{id}
PATCH /api/incidents/{id}/status

If your backend URL differs, change the `base` values in:
src/app/core/auth/auth.service.ts
src/app/core/services/location.service.ts
src/app/core/services/incident.service.ts

The backend currently returns the first India Post PostOffice District as the application's city field. If you want exact City/Town rather than District, extend the backend location response.
