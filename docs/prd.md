Product Requirements Document (PRD)

Project Title: ParkSmart

Description

ParkSmart is a mobile application that helps Chico State students find realistic campus parking options and reduce the time and stress of searching for parking before class. Users can enter a campus destination and receive parking recommendations based on destination, current parking availability, and walking distance.

Rather than simply directing students to the closest parking lot, ParkSmart helps students find a parking option where they are more likely to find an available space. Students can also view current parking conditions, view recent user reports, submit parking-condition updates, receive directions, and save class locations.

Scope

Based on the Analyst's Level 1 Specification, ParkSmart v1 will include features in six epics:

Find Parking – enter a campus destination, view parking options, compare parking options, select a parking lot

Recommend Parking – recommend a parking lot based on destination, current availability, and walking distance

View Parking Conditions – view parking lot status, recent user reports, and current availability

Report Parking Conditions – report a lot as open, nearly full, or full and submit the parking update

Navigate – view a parking location and receive driving and walking directions

Save Destinations – save class locations, view saved locations, and select a saved location for future parking searches

Out of Scope

The Analyst's Level 1 Specification does not define the following as ParkSmart v1 features:

Parking payments

Parking permit purchasing

Parking space reservations

Advanced AI or machine-learning parking predictions

Administrative parking management features

Technical Architecture

Frontend (Client)

React + Vite

Mobile-first design

React Router for navigation between ParkSmart screens

Responsive interface designed primarily for student mobile devices

Frontend communicates with the Express API for application data

The primary frontend screens will support destination entry, parking options, parking recommendations, parking lot conditions, user reports, reporting parking conditions, navigation, and saved destinations.

Backend (API Layer)

Express.js REST API using Node.js

Serves as the gateway between the frontend and application data

Handles application logic, validation, and routing

Organizes endpoints by ParkSmart feature areas

Handles parking lot information, parking reports, recommendations, and saved destinations

Middleware for error handling and request validation

Application data operations go through the API rather than allowing the frontend to directly modify the database

Example API areas may include:

/destinations

/parking-lots

/recommendations

/parking-reports

/saved-destinations

Database

Supabase (Postgres-based)

Stores ParkSmart application data

Data needed for the Level 1 Specification includes:

Campus destinations

Parking lot information

Parking-condition reports

Current/recent parking status information

Saved class locations

The Express API connects to Supabase to retrieve and update application data.

Navigation / Mapping

ParkSmart requires mapping functionality to support:

Viewing parking locations

Driving directions to a selected parking lot

Walking directions from a parking lot to the user's campus destination

A mapping/navigation service will be integrated during development.

Deployment Strategy

Frontend: Deployed as the ParkSmart client application

API Layer: Express/Node.js API deployment

Database: Managed through Supabase cloud

Source Code: GitHub public repository

Specific hosting services can be selected during development.

Development Tools

GitHub for version control and collaboration

Devin for development and coding assistance

Git for source control

Supabase for database management

React + Vite for frontend development

Node.js + Express for API development

Key Considerations

Mobile-First: ParkSmart is primarily designed for Chico State students using mobile devices.

Current Parking Information: Recommendations should consider current parking availability rather than only distance.

Walking Distance: Parking recommendations should consider how far a student will need to walk from the parking lot to the selected campus destination.

Community Reporting: Students can contribute parking-condition reports that help other students make parking decisions.

Internet Connection: Users need internet access when retrieving or submitting current parking information.

Separation of Concerns: The frontend handles the user interface, the API handles application logic, and Supabase handles data persistence.

Environment Variables: API keys and other private credentials should be stored in .env files and should never be committed to GitHub.

Simple User Experience: Students should be able to quickly find parking information without navigating through unnecessary screens.