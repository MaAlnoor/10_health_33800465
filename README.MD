Fitness Tracker App

Sample coursework project for the Dynamic Web Applications module.

Uses Node.js, Express, EJS, and MySQL.

To install and run:

npm install
node index.js

Dotenv

Install dotenv:

npm install dotenv


Create a .env file in the project root and add the database configuration exactly as required by the assignment:

HEALTH_HOST=localhost
HEALTH_USER=health_app
HEALTH_PASSWORD=qwertyuiop
HEALTH_DATABASE=health
HEALTH_BASE_PATH=http://localhost:8000


Add .env to .gitignore so it is never committed to GitHub.

In index.js, dotenv is loaded using:

require('dotenv').config();


All database credentials are now accessed securely using:

process.env.HEALTH_HOST
process.env.HEALTH_USER
process.env.HEALTH_PASSWORD
process.env.HEALTH_DATABASE

Features Added

I created a full fitness-tracking application where users can log their workouts and monitor progress. The app includes:

User Accounts

A full registration and login system using hashed passwords (bcrypt).
Login is required to access any workout-related features.
Successful and failed login attempts display clear feedback messages.

I added a default user gold / smiths as required by the assignment.

Workout Tracking

Users can:

Add workouts (name, duration, intensity, calories, notes)

View a complete history of workouts

Search workouts by name

View statistics (total minutes and total calories)

Only logged-in users can access these pages. This prevents unauthenticated access and mirrors the behaviour of the protected pages in the labs.

API

I added a JSON API at:

/api/workouts


This returns all workouts in JSON format, similar to the books API in the sample code.
It can be used for testing or integration with other tools.

Access Control

To protect user data, I added access control so that only logged-in users can access:

Add Workout page

Workout List

Workout Search

Workout Statistics

Just like the lab exercises, unauthenticated users are redirected to the login page, while registered and logged-in users can navigate normally.

Validation

I added server-side validation to all user-submitted forms, including:

Registration

Login

Add Workout

The checks ensure details are valid — for example, usernames must be long enough, emails must be valid, and workout fields must contain correct numeric values.

Validation prevents malformed entries while keeping the interface simple.

Sanitisation

I added sanitisation to all free-text fields:

First name

Last name

Username

Workout name

Notes

These fields could be used to inject harmful HTML or JavaScript, so sanitisation protects the application from XSS attacks.

I deliberately did not sanitise passwords or numeric fields, because:

Passwords must remain unchanged so they can be hashed correctly

Numbers should not be altered by HTML escaping

Only fields that present an actual security risk were sanitised.

Additional Features

I added a workout statistics page showing:

Total minutes exercised

Total calories burned

This gives the user a simple overview of their fitness progress.

I also added search functionality so users can quickly locate previous workouts, similar to the book-search feature in Bertie’s Books.

The app includes a JSON endpoint for workouts, which demonstrates API design and the use of dynamic SQL filtering.
