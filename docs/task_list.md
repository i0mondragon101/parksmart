Task List

Epic: Find Parking

Task: Build Campus Destination Entry (Frontend)

User Story: As a Chico State student, I want to enter my campus destination so that I can find parking near where I need to go.

Acceptance Criteria: User can enter or select a campus destination and submit it to view relevant parking options.

Task: Build Parking Options View (Frontend)

User Story: As a Chico State student, I want to view parking options near my destination so that I can choose an appropriate place to park.

Acceptance Criteria: Displays parking options associated with the selected campus destination. User can compare options and select a parking lot.

Task: Create GET /parking-lots API Endpoint

Acceptance Criteria:

Accepts a campus destination as a query parameter.

Returns parking lots relevant to the selected destination.

Returns information needed to display and compare parking options.

Returns status 200 for successful requests and an appropriate error response for failed requests.

Epic: Recommend Parking

Task: Build Parking Recommendation View (Frontend)

User Story: As a Chico State student, I want ParkSmart to recommend a parking lot so that I can spend less time deciding where to park.

Acceptance Criteria: Displays a recommended parking lot after the student selects a campus destination. Recommendation clearly identifies the suggested lot.

Task: Add Current Availability to Parking Recommendations

User Story: As a Chico State student, I want parking recommendations to consider current availability so that I am less likely to drive to a full parking lot.

Acceptance Criteria: Parking recommendations consider current parking availability. Lots currently reported as full should not be prioritized over lots with better reported availability.

Task: Include Walking Distance in Recommendation Logic

Acceptance Criteria: Recommendation logic considers the walking distance between each parking option and the student's campus destination.

Task: Create GET /recommendations API Endpoint

Acceptance Criteria:

Accepts the user's selected campus destination.

Evaluates relevant parking options.

Considers destination, current availability, and walking distance.

Returns a recommended parking lot.

Returns status 200 for a successful recommendation and an appropriate error response for failed requests.

Epic: View Parking Conditions

Task: Build Parking Lot Status View (Frontend)

User Story: As a Chico State student, I want to view a parking lot's current reported status so that I can determine whether the lot may have available parking.

Acceptance Criteria: Selected parking lot displays its current reported parking condition in a clear, mobile-friendly format.

Task: Build Recent User Reports View (Frontend)

User Story: As a Chico State student, I want to view recent user reports for a parking lot so that I can make a more informed parking decision.

Acceptance Criteria: Displays recent parking-condition reports associated with the selected parking lot and provides enough information to show how recent each report is.

Task: Create GET /parking-lots/ API Endpoint

Acceptance Criteria:

Returns information for the selected parking lot.

Includes its current reported status.

Includes information needed to display the parking location.

Returns status 200 when the parking lot is found.

Returns an appropriate error if the parking lot does not exist.

Task: Create GET /parking-reports API Endpoint

Acceptance Criteria:

Accepts a parking lot ID.

Returns recent parking-condition reports for that lot.

Reports are returned with their parking condition and timestamp.

Returns status 200 for successful requests.

Epic: Report Parking Conditions

Task: Build Parking-Condition Update Form (Frontend)

User Story: As a Chico State student, I want to submit a parking-condition update so that I can help other students make informed parking decisions.

Acceptance Criteria:

User can select the applicable parking lot.

User can report the lot as Open, Nearly Full, or Full.

User can submit the parking update.

Successful submission provides confirmation to the user.

Task: Create POST /parking-reports API Endpoint

Acceptance Criteria:

Accepts a parking lot ID and parking condition.

Valid parking conditions include Open, Nearly Full, and Full.

Saves the parking-condition report with a timestamp.

Returns 201 Created after a successful submission.

Invalid submissions return an appropriate error response.

Epic: Navigate

Task: Build Parking Location View (Frontend)

Acceptance Criteria: User can view the location of a selected parking lot before requesting directions.

Task: Add Driving Directions (Frontend)

User Story: As a Chico State student, I want to receive driving directions to a selected parking lot so that I can travel to the parking location.

Acceptance Criteria:

User can request driving directions for a selected parking lot.

Selected parking lot is used as the destination.

Driving directions are displayed or opened through the selected mapping service.

Task: Add Walking Directions (Frontend)

User Story: As a Chico State student, I want to receive walking directions from my parking lot to my campus destination so that I can reach my final location.

Acceptance Criteria:

User can request walking directions.

Selected parking lot is used as the starting point.

Selected campus destination is used as the ending point.

Walking directions are displayed or opened through the selected mapping service.

Task: Integrate Mapping / Navigation Service

Acceptance Criteria:

Parking locations can be passed to the mapping service.

Campus destinations can be passed to the mapping service.

Supports driving directions to parking lots.

Supports walking directions from parking lots to campus destinations.

Epic: Save Destinations

Task: Build Save Class Location Feature (Frontend)

User Story: As a Chico State student, I want to save a class location so that I do not need to enter the same destination every time I search for parking.

Acceptance Criteria:

User can save a selected class location.

Saved class location remains available for future parking searches.

Task: Build Saved Locations View (Frontend)

Acceptance Criteria:

User can view saved class locations.

User can select a previously saved location.

Selecting a saved location can be used to begin a parking search.

Task: Create POST /saved-destinations API Endpoint

Acceptance Criteria:

Accepts a class/campus destination.

Saves the destination for future use.

Returns 201 Created after successful creation.

Task: Create GET /saved-destinations API Endpoint

Acceptance Criteria:

Returns the user's saved class locations.

Saved locations contain enough information to reuse the destination in a parking search.

Returns status 200 for successful requests.

Shared / Supporting

Task: Set Up React + Vite Client

Acceptance Criteria:

React application runs successfully using Vite.

Client follows a mobile-first layout.

Main ParkSmart page views can be accessed through application navigation.

Task: Set Up Express API

Acceptance Criteria:

Express server runs successfully.

API routes are organized by ParkSmart feature area.

API includes basic request validation and error handling.

Task: Set Up Supabase Database

Acceptance Criteria:

Express API successfully connects to Supabase.

Database supports parking lots, campus destinations, parking-condition reports, and saved destinations.

Application data can be created and retrieved through the API.

Task: Connect Frontend to API

Acceptance Criteria:

React frontend successfully makes requests to the Express API.

Parking information returned by the API can be displayed in the frontend.

Parking-condition updates submitted through the frontend can be sent to the API.

Task: Mobile-First Testing

Acceptance Criteria:

Core ParkSmart screens display correctly on a mobile-sized screen.

Buttons and forms are usable on a touchscreen.

Users can complete the main parking flow from destination entry through parking selection and navigation.

Task: End-to-End ParkSmart Testing

Acceptance Criteria:

User can enter a campus destination.

User can view parking options.

User can receive a parking recommendation.

Recommendation considers current availability.

User can view current parking status and recent reports.

User can submit a parking-condition update.

User can receive driving and walking directions.

User can save and reuse a class location.