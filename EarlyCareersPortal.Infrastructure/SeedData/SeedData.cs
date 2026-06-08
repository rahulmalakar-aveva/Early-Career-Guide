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

        if (!db.Faqs.Any())
        {
            db.Faqs.AddRange(
                new Faq { Question = "When will I be assigned to a team?", Answer = "You will typically be assigned to a team within your first month of joining. Your manager will discuss team placement during your onboarding.", Category = "Onboarding", DisplayOrder = 1 },
                new Faq { Question = "How do I set up my workstation?", Answer = "IT will provide you with a laptop and necessary equipment on your first day. Follow the setup guide sent to your email, and contact IT support if you need assistance.", Category = "Onboarding", DisplayOrder = 2 },
                new Faq { Question = "What are the working hours?", Answer = "Standard working hours are 9:00 AM to 5:30 PM, with flexibility depending on your team. Discuss your preferred schedule with your manager.", Category = "General", DisplayOrder = 1 },
                new Faq { Question = "How do I request time off?", Answer = "Use the HR portal to submit leave requests. Make sure to inform your manager in advance and get approval before finalizing travel plans.", Category = "General", DisplayOrder = 2 },
                new Faq { Question = "Where can I find training resources?", Answer = "Access the learning portal through the internal website. You'll find courses on technical skills, soft skills, and company-specific tools.", Category = "Learning", DisplayOrder = 1 },
                new Faq { Question = "How do I join a mentorship program?", Answer = "Contact HR or your team lead to express interest in mentorship. Programs are available for both mentees and those who want to become mentors.", Category = "Learning", DisplayOrder = 2 },
                new Faq { Question = "What benefits do I have access to?", Answer = "You have access to health insurance, retirement plans, gym memberships, and more. Check the HR portal for complete benefits documentation.", Category = "Benefits", DisplayOrder = 1 },
                new Faq { Question = "How do I access the office?", Answer = "Your employee badge will grant you access to the building and your floor. Contact security if you have any access issues.", Category = "Facilities", DisplayOrder = 1 }
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