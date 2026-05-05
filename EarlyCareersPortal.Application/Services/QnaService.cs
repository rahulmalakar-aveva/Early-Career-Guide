using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
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
}