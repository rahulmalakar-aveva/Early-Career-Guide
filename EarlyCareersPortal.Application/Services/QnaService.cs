using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using EarlyCareersPortal.Domain.Entities;
using EarlyCareersPortal.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EarlyCareersPortal.Application.Services;

public class QnaService : IQnaService
{
    private readonly AppDbContext _db;

    public QnaService(AppDbContext db) => _db = db;

    public async Task<List<QnaDto>> GetAll()
    {
        return await _db.QnaItems
            .Select(x => new QnaDto(x.Id, x.Question, x.Answer))
            .ToListAsync();
    }

    public async Task<QnaDto> Create(CreateQnaDto dto)
    {
        var entity = new QnaItem
        {
            Id = Guid.NewGuid(),
            Question = dto.Question,
            Answer = null
        };
        _db.QnaItems.Add(entity);
        await _db.SaveChangesAsync();
        return new QnaDto(entity.Id, entity.Question, entity.Answer);
    }

    public async Task<QnaDto?> Answer(Guid id, AnswerQnaDto dto)
    {
        var entity = await _db.QnaItems.FindAsync(id);
        if (entity is null) return null;
        entity.Answer = dto.Answer;
        await _db.SaveChangesAsync();
        return new QnaDto(entity.Id, entity.Question, entity.Answer);
    }

    public async Task<bool> Delete(Guid id)
    {
        var entity = await _db.QnaItems.FindAsync(id);
        if (entity is null) return false;
        _db.QnaItems.Remove(entity);
        await _db.SaveChangesAsync();
        return true;
    }
}