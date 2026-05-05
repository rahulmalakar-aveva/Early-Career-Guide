using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using EarlyCareersPortal.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EarlyCareersPortal.Application.Services;

public class UsefulLinkService : IUsefulLinkService
{
    private readonly AppDbContext _db;

    public UsefulLinkService(AppDbContext db) => _db = db;

    public async Task<List<UsefulLinkDto>> GetAll()
    {
        return await _db.UsefulLinks
            .Select(x => new UsefulLinkDto(x.Id, x.Title, x.Url, x.Category))
            .ToListAsync();
    }

    public async Task Add(CreateUsefulLinkDto dto)
    {
        _db.UsefulLinks.Add(new()
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Url = dto.Url,
            Category = dto.Category
        });

        await _db.SaveChangesAsync();
    }
}