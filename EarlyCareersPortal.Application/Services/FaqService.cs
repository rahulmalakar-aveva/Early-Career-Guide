using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using EarlyCareersPortal.Domain.Entities;
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

    public async Task<FaqDto> Create(CreateFaqDto dto)
    {
        var entity = new Faq
        {
            Question = dto.Question,
            Answer = dto.Answer,
            Category = dto.Category,
            DisplayOrder = dto.DisplayOrder
        };
        _db.Faqs.Add(entity);
        await _db.SaveChangesAsync();

        return new FaqDto
        {
            Id = entity.Id,
            Question = entity.Question,
            Answer = entity.Answer,
            Category = entity.Category,
            DisplayOrder = entity.DisplayOrder
        };
    }

    public async Task<FaqDto?> Update(int id, CreateFaqDto dto)
    {
        var entity = await _db.Faqs.FindAsync(id);
        if (entity is null) return null;

        entity.Question = dto.Question;
        entity.Answer = dto.Answer;
        entity.Category = dto.Category;
        entity.DisplayOrder = dto.DisplayOrder;
        await _db.SaveChangesAsync();

        return new FaqDto
        {
            Id = entity.Id,
            Question = entity.Question,
            Answer = entity.Answer,
            Category = entity.Category,
            DisplayOrder = entity.DisplayOrder
        };
    }

    public async Task<bool> Delete(int id)
    {
        var entity = await _db.Faqs.FindAsync(id);
        if (entity is null) return false;
        _db.Faqs.Remove(entity);
        await _db.SaveChangesAsync();
        return true;
    }
}
