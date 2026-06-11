using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Services;
using EarlyCareersPortal.Domain.Entities;
using EarlyCareersPortal.Domain.Enums;
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
builder.Services.AddScoped<IFaqService, FaqService>();
builder.Services.AddScoped<IPeerSessionService, PeerSessionService>();

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

    // Seed useful links by title (idempotent)
    var existingLinkTitles = db.UsefulLinks.Select(l => l.Title).ToHashSet();
    var linksToSeed = new[]
    {
        new UsefulLink { Id = Guid.NewGuid(), Title = "AVEVA Learning Platform", Url = "https://learning.aveva.com", Category = "Learning", Description = "Official AVEVA training courses and certifications" },
        new UsefulLink { Id = Guid.NewGuid(), Title = "Company Handbook", Url = "https://handbook.aveva.com", Category = "Onboarding", Description = "Policies, benefits, and everything you need to know" },
        new UsefulLink { Id = Guid.NewGuid(), Title = "HR Portal", Url = "https://hr.aveva.com", Category = "HR", Description = "Leave requests, payslips, and HR services" },
        new UsefulLink { Id = Guid.NewGuid(), Title = "IT Support", Url = "https://itsupport.aveva.com", Category = "IT", Description = "Raise tickets for hardware, software, and access issues" },
        new UsefulLink { Id = Guid.NewGuid(), Title = "Confluence Wiki", Url = "https://confluence.aveva.com", Category = "Documentation", Description = "Internal documentation and team wikis" },
        new UsefulLink { Id = Guid.NewGuid(), Title = "GitHub Enterprise", Url = "https://github.aveva.com", Category = "Development", Description = "Source code repositories and CI/CD pipelines" },
        new UsefulLink { Id = Guid.NewGuid(), Title = "Onboarding Guide", Url = "https://aveva.oak.com/Home/Index/efd5f51d-6268-4705-9e0c-dd6453532b40", Category = "Onboarding", Description = "Your complete guide to surviving and thriving in your first 30 days" }
    };
    var missingLinks = linksToSeed.Where(l => !existingLinkTitles.Contains(l.Title)).ToList();
    if (missingLinks.Count > 0)
    {
        db.UsefulLinks.AddRange(missingLinks);
        db.SaveChanges();
    }

    // Seed blog posts/tips if empty
    if (!db.BlogPosts.Any())
    {
        db.BlogPosts.AddRange(
            new BlogPost { Id = Guid.NewGuid(), Title = "First Week Setup", Content = "Don't hesitate to ask questions. Everyone was a beginner once! Reach out to your assigned buddy for quick clarifications on internal jargon.", AuthorName = "Sarah Johnson", Type = PostType.Tip },
            new BlogPost { Id = Guid.NewGuid(), Title = "Code Review Best Practices", Content = "When reviewing code, focus on logic and maintainability first, style second. Always be constructive and ask questions rather than making demands.", AuthorName = "Michael Chen", Type = PostType.Tip },
            new BlogPost { Id = Guid.NewGuid(), Title = "Understanding Our Architecture", Content = "Start by tracing a single user request from the UI down to the database. Build your mental model vertically first, then horizontally.", AuthorName = "Emily Rodriguez", Type = PostType.Tip },
            new BlogPost { Id = Guid.NewGuid(), Title = "Meeting Etiquette", Content = "When joining large virtual meetings, remain on mute unless called upon, but try to have your camera on for the first 5 minutes to establish a personal connection.", AuthorName = "David Martinez", Type = PostType.Tip },
            new BlogPost { Id = Guid.NewGuid(), Title = "Documentation Tips", Content = "Always update the README when making architectural changes. Future you (and your teammates) will thank you for clear documentation.", AuthorName = "Priya Sharma", Type = PostType.Tip }
        );
        db.SaveChanges();
    }

    // Seed Q&A items idempotently
    var existingQuestions = db.QnaItems.Select(q => q.Question).ToHashSet();
    var qnaToSeed = new[]
    {
        "When will I be assigned to a team?",
        "How do I set up my dev environment?",
        "Who do I contact for IT access issues?",
        "How do I request time off?",
        "Where can I find the internal project documentation?"
    };
    var missingQna = qnaToSeed.Where(q => !existingQuestions.Contains(q))
        .Select(q => new QnaItem { Id = Guid.NewGuid(), Question = q })
        .ToList();
    if (missingQna.Count > 0)
    {
        db.QnaItems.AddRange(missingQna);
        db.SaveChanges();
    }

    // Seed peer sessions if empty
    if (!db.PeerSessions.Any())
    {
        db.PeerSessions.AddRange(
            new PeerSession { Title = "Tool Walkthrough", JoinLink = "https://teams.microsoft.com/l/meetup-join/placeholder1", CreatedAt = DateTime.UtcNow },
            new PeerSession { Title = "Ask Me Anything", JoinLink = "https://teams.microsoft.com/l/meetup-join/placeholder2", CreatedAt = DateTime.UtcNow }
        );
        db.SaveChanges();
    }
}

app.Run();