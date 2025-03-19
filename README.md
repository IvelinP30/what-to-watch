## WhatToWatch
Deciding on a movie or a show got you stuck? WhatToWatch solves the dilemma by offering daily trending movie suggestions. Originally a personal solution to giving me one movie a day, this app has evolved to simplify your entertainment choices. Quickly discover, search, and sort through movies and shows, saving you from the endless scrolling. Problem solved – find your next watch with just one click!



## Quick Start
1. Navigate to [what-to-watch-today.vercel.app](https://what-to-watch-today.vercel.app/)
2. Click on "Todays Movie" or on "Random Movie" to get a sugestion.
3. Browse around and test some of the other features.
    - Search for a movie or a show
    - Visit the "Movies" or "Shows" sections and Filter/Sort the results
    - See the detailed information for a movie or a show you are intrested in



![localhost_5173_](https://github.com/TeodorTodorovT/WhatToWatch/assets/44364594/46156e84-ef26-494d-af4f-b850eaf3575a)



## Local Installation:

Make sure that you have Node version ^14.18.0 installed as it is required to run the project!
To install Node plase take a look at this article:
- [Node Version Manager – NVM Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)

1. Get your free API key from [TMDB](https://developer.themoviedb.org/docs/getting-started)
2. Open a terminal in an empty directory
3. Clone the repo - `git clone https://github.com/TeodorTodorovT/WhatToWatch.git`
4. Add a file named `.env.local` to the directory and enter the following inside:
> VITE_BASE_URL = "https://api.themoviedb.org/3"
>
> VITE_DB_ACCESS_TOKEN = "{THE API KEY YOU GOT FROM TMDB}"
5. Install NPM Packages - `npm install`
6. Start the application - `npm run dev`
