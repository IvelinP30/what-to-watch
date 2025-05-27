## WhatToWatch
Deciding on a movie or a show got you stuck? WhatToWatch solves the dilemma by offering daily trending movie suggestions. Originally a personal solution to giving one movie a day, this app evolved to simplify your entertainment choices. Quickly discover, search, and sort through movies and shows, saving you from endless scrolling. Problem solved – find your next watch with just one click!


## Quick Start
1. Click on "Todays Movie" or on "Random Movie" to get a sugestion.
2. Browse around and test some of the other features.
    - Search for a movie or a show
    - Visit the "Movies" or "Shows" sections and Filter/Sort the results
    - See the detailed information for a movie or a show you are intrested in

## Technology Stack

- Backend: Java Spring Boot
- Database: PostgreSQL
- Frontend: ReactJS
- Movie data source: TMDB API
- Authentication: Spring Security + JWT

## Local Installation:

Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js ^14.18.0 (recommend using NVM to manage versions)
- PostgreSQL database running locally or accessible remotely


Setup Steps

1. Clone the repository 
    > `git clone https://github.com/IvelinP30/what-to-watch.git`
    > cd WhatToWatch
2. Configure TMDB API key
    - You need an API key from TMDB
    - Create a file application.yaml inside the backend resources (typically under src/main/resources/) with:
    > tmdb:
        > api:
            > key: your_tmdb_api_key_here
        > base:
            > url: https://api.themoviedb.org/3
3. Configure PostgreSQL connection
    - In application.yaml, add your database settings like:
    > spring:
        > datasource:
            > url: jdbc:postgresql://localhost:5432/your_database
            > username: your_username
            > password: your_password
        > jpa:
            > hibernate:
            > ddl-auto: update
            > show-sql: true
4. Run backend
    - Use Maven to build and run:
    > ./mvnw clean install
    > ./mvnw spring-boot:run
5. Setup frontend
    - Navigate to the React frontend folder:
    > cd frontend
    - Create .env.local file with:
    > VITE_BASE_URL=https://api.themoviedb.org/3
    >  VITE_DB_ACCESS_TOKEN=your_tmdb_api_key_here
6. Install and run frontend
    > npm install
    > npm run dev
7. Access app
    - Open your browser at http://localhost:3000

## Notes

The backend API handles user accounts, favorites, watchlists, and recommendations.
Frontend communicates with the backend to manage user sessions and display movie data.
Make sure your PostgreSQL server is running and accessible before starting backend.