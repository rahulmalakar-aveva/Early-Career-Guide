using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using EarlyCareersPortal.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EarlyCareersPortal.Application.Services;

public class FaqService : IFaqService
{
    private readonly AppDbContext _db;

    public FaqService(AppDbContext db) => _db = db;

    public async Task<List<FaqDto>> GetAll()
    {
        return await _db.Faqs
            .OrderBy(x => x.Category)
            .ThenBy(x => x.DisplayOrder)
            .Select(x => new FaqDto
            {
                Id = x.Id,
                Question = x.Question,
                Answer = x.Answer,
                Category = x.Category,
                DisplayOrder = x.DisplayOrder
            })
            .ToListAsync();
    }

    public async Task<List<FaqDto>> GetByCategory(string category)
    {
        return await _db.Faqs
            .Where(x => x.Category == category)
            .OrderBy(x => x.DisplayOrder)
            .Select(x => new FaqDto
            {
                Id = x.Id,
                Question = x.Question,
                Answer = x.Answer,
                Category = x.Category,
                DisplayOrder = x.DisplayOrder
            })
            .ToListAsync();
    }
}
