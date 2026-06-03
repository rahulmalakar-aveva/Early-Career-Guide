using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using EarlyCareersPortal.Domain.Entities;
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
            .Select(x => new UsefulLinkDto(x.Id, x.Title, x.Url, x.Category, x.Description))
            .ToListAsync();
    }

    public async Task<UsefulLinkDto> Create(CreateUsefulLinkDto dto)
    {
        var entity = new UsefulLink
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Url = dto.Url,
            Category = dto.Category,
            Description = dto.Description
        };
        _db.UsefulLinks.Add(entity);
        await _db.SaveChangesAsync();
        return new UsefulLinkDto(entity.Id, entity.Title, entity.Url, entity.Category, entity.Description);
    }

    public async Task<bool> Delete(Guid id)
    {
        var entity = await _db.UsefulLinks.FindAsync(id);
        if (entity is null) return false;
        _db.UsefulLinks.Remove(entity);
        await _db.SaveChangesAsync();
        return true;
    }
}
