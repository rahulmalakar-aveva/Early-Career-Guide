using EarlyCareersPortal.Domain.Entities;
using EarlyCareersPortal.Domain.Enums;
using Microsoft.Extensions.DependencyInjection;
using EarlyCareersPortal.Infrastructure.Persistence;

namespace EarlyCareersPortal.Infrastructure.SeedData;

public static class SeedData
{
    public static void Initialize(IServiceProvider services)
    {
        var db = services.GetRequiredService<AppDbContext>();

        if (db.QnaItems.Any()) return;

        if (!db.UsefulLinks.Any())
        {
            db.UsefulLinks.Add(new UsefulLink
            {
                Id = Guid.NewGuid(),
                Title = "Onboarding Guide",
                Url = "https://aveva.oak.com/Home/Index/efd5f51d-6268-4705-9e0c-dd6453532b40",
                Category = "Onboarding",
                Description = "Your complete guide to surviving and thriving in your first 30 days"
            });
        }

        if (!db.Contacts.Any())
        {
            db.Contacts.AddRange(
                new Contact { Name = "Basha Shaik", Email = "basha.shaik@aveva.com" },
                new Contact { Name = "Prashanth Nidamarthy", Email = "prashanth.nidamarthy@aveva.com" },
                new Contact { Name = "Liya A R", Email = "liya.ar@aveva.com" }
            );
        }

        //db.QnaItems.Add(new QnaItem
        //{
        //    Id = Guid.NewGuid(),
        //    Question = "When will I be assigned to a team?",
        //    Answer = "You will be assigned to a team after a month of your joining date."
        //});

        //db.BlogPosts.Add(new BlogPost
        //{
        //    Id = Guid.NewGuid(),
        //    Title = "First Week Tip",
        //    Content = "Ask questions early",
        //    AuthorName = "Senior",
        //    Type = PostType.Tip
        //});

        db.SaveChanges();
    }
}