using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using EarlyCareersPortal.Domain.Entities;
using EarlyCareersPortal.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EarlyCareersPortal.Application.Services;

public class PeerSessionService : IPeerSessionService
{
    private readonly AppDbContext _db;

    public PeerSessionService(AppDbContext db) => _db = db;

    public async Task<List<PeerSessionDto>> GetAll()
    {
        return await _db.PeerSessions
            .Select(x => new PeerSessionDto(x.Id, x.Title, x.JoinLink, x.CreatedAt))
            .ToListAsync();
    }

    public async Task<PeerSessionDto> Create(CreatePeerSessionDto dto)
    {
        var entity = new PeerSession
        {
            Title = dto.Title,
            JoinLink = dto.JoinLink,
            CreatedAt = DateTime.UtcNow
        };
        _db.PeerSessions.Add(entity);
        await _db.SaveChangesAsync();
        return new PeerSessionDto(entity.Id, entity.Title, entity.JoinLink, entity.CreatedAt);
    }

    public async Task<PeerSessionDto?> Update(int id, CreatePeerSessionDto dto)
    {
        var entity = await _db.PeerSessions.FindAsync(id);
        if (entity is null) return null;

        entity.Title = dto.Title;
        entity.JoinLink = dto.JoinLink;
        await _db.SaveChangesAsync();

        return new PeerSessionDto(entity.Id, entity.Title, entity.JoinLink, entity.CreatedAt);
    }

    public async Task<bool> Delete(int id)
    {
        var entity = await _db.PeerSessions.FindAsync(id);
        if (entity is null) return false;
        _db.PeerSessions.Remove(entity);
        await _db.SaveChangesAsync();
        return true;
    }
}
