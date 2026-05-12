# Early-Career-Guide
**All-In-One site for Early Careers**

## Setup Steps

1. Clone the project
2. Create your own branch out of the `main` branch
3. Configure Database:** Open Visual Studio 2026 -> `appsettings.json` -> add your server name to connect with SSMS
4. Run the following migration scripts:
  ```bash
   dotnet ef migrations add InitialCreate \
     --project ./EarlyCareersPortal.Infrastructure/EarlyCareersPortal.Infrastructure.csproj \
     --startup-project ./EarlyCareersPortal.Api/EarlyCareersPortal.Api.csproj \
     -o Migrations

   dotnet ef database update \
     --project ./EarlyCareersPortal.Infrastructure/EarlyCareersPortal.Infrastructure.csproj \
     --startup-project ./EarlyCareersPortal.Api/EarlyCareersPortal.Api.csproj
  ```
6. Open Visual Studio 2026 -> Open EarlyCareersPortal.slnx -> Build the Solution -> Type "dotnet run" in terminal (you can also use VS UI to run the solution)
7. From the command prompt, copy the listening port (e.g. 5037).
8. Open VS Code -> client -> src -> app -> services -> api.service.ts -> in base add your backend port (e.g. base = 'localhost:5037/api';)
9. Open terminal -> In terminal "npm i" -> "cd client" -> "ng serve" -> Open the frontend port (e.g. localhost:4200)
