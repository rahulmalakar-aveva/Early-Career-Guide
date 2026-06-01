using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Services;
using EarlyCareersPortal.Domain.Entities;
using EarlyCareersPortal.Infrastructure.Persistence;
using EarlyCareersPortal.Infrastructure.SeedData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<IQnaService, QnaService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IUsefulLinkService, UsefulLinkService>();
builder.Services.AddScoped<IContactService, ContactService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

// Seed and apply migrations
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var db = services.GetRequiredService<AppDbContext>();
    // apply any pending migrations
    db.Database.Migrate();
    SeedData.Initialize(services);

    // Seed useful links if empty
    if (!db.UsefulLinks.Any())
    {
        db.UsefulLinks.AddRange(
            new UsefulLink { Id = Guid.NewGuid(), Title = "AVEVA Learning Platform", Url = "https://learning.aveva.com", Category = "Learning", Description = "Official AVEVA training courses and certifications" },
            new UsefulLink { Id = Guid.NewGuid(), Title = "Company Handbook", Url = "https://handbook.aveva.com", Category = "Onboarding", Description = "Policies, benefits, and everything you need to know" },
            new UsefulLink { Id = Guid.NewGuid(), Title = "HR Portal", Url = "https://hr.aveva.com", Category = "HR", Description = "Leave requests, payslips, and HR services" },
            new UsefulLink { Id = Guid.NewGuid(), Title = "IT Support", Url = "https://itsupport.aveva.com", Category = "IT", Description = "Raise tickets for hardware, software, and access issues" },
            new UsefulLink { Id = Guid.NewGuid(), Title = "Confluence Wiki", Url = "https://confluence.aveva.com", Category = "Documentation", Description = "Internal documentation and team wikis" },
            new UsefulLink { Id = Guid.NewGuid(), Title = "GitHub Enterprise", Url = "https://github.aveva.com", Category = "Development", Description = "Source code repositories and CI/CD pipelines" },
            new UsefulLink { Id = Guid.NewGuid(), Title = "Onboarding Guide", Url = "https://aveva.oak.com/Home/Index/efd5f51d-6268-4705-9e0c-dd6453532b40", Category = "Onboarding", Description = "Your complete guide to surviving and thriving in your first 30 days" }
        );
        db.SaveChanges();
    }
}

app.Run();