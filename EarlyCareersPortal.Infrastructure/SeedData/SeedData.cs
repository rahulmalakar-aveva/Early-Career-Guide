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