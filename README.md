```markdown
# CELL

CELL is a full-stack application that simulates and displays [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). The application features a list of predefined game configurations and allows users to interact with the simulation. Registered users can also create, read, update, and delete their game configurations. The frontend is built using React.js, while the backend is built with ASP.NET Core Web API, .NET 5, and Swagger. The app also uses Firebase for user authentication and a SQL database.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- [Visual Studio](https://visualstudio.microsoft.com/downloads/) (latest version recommended)
- [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)

### Steps

1. Clone the repository:
   git clone https://github.com/DesertSled800c/Cell-Full-Stack
  
2. Open the `cell.sln` file in Visual Studio

3. In Visual Studio, restore NuGet packages for the backend project

4. Run the `.sql` file located in the backend project to create the database

5. [Set up a Firebase project and configure the authentication]
   
6. To install Firebase 8.7.1, run the following command in the terminal:

npm install firebase@8.7.1

7. Update the `appsettings.json` file in the backend project with your Firebase project ID:
   {
     "FirebaseProjectId": "your-firebase-project-id"
   }
   
8. Create a `.env` file in the `client` folder with your Firebase API key:
   { 
     REACT_APP_API_KEY="your-api-key"
   }

## Usage

### Frontend

1. Install frontend dependencies:
  
   cd CELL/client
   npm install
   
2. Start the frontend development server:
  
   npm start
  
### Backend

1. In Visual Studio, run the backend project to start the API server and open the Swagger UI.

Now you can access the application at `http://localhost:3000` and interact with the backend API at `http://localhost:5000`.

## Features

- Simulate and display Conway's Game of Life
- Predefined game configurations for users to choose from
- User authentication with Firebase
- Registered users can create, read, update, and delete their game configurations
- Responsive user interface built with React.js
- Backend API built with ASP.NET Core and .NET 5
- API documentation using Swagger
- SQL database for storing game configurations
```
