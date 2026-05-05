# Early-Career-Guide
All-In-One site for Early Careers

Setup Steps:
1. Clone the project
2. Create your own branch out of main branch
3. Open Visual Studio 2026 -> Open EarlyCareersPortal.slnx -> Build the Solution -> Type "dotnet run" in terminal (you can also use VS UI to run the solution)
4. From the command prompt, copy the listening port (e.g. 5037).
5. Open VS Code -> client -> src -> app -> services -> api.service.ts -> in base add your backend port (e.g. base = 'http://localhost:5037/api';)
6. Open terminal -> In terminal "npm i" -> "cd client" -> "ng serve" -> Open the frontend port (e.g. localhost:4200)
