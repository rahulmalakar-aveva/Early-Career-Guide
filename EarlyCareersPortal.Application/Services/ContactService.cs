using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using EarlyCareersPortal.Domain.Entities;
using EarlyCareersPortal.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EarlyCareersPortal.Application.Services;

public class ContactService : IContactService
{
    private readonly AppDbContext _db;

    public ContactService(AppDbContext db) => _db = db;

    public async Task<List<ContactDto>> GetAll()
    {
        return await _db.Contacts
            .OrderBy(x => x.Name)
            .Select(x => new ContactDto
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<ContactDto> Create(string name, string email)
    {
        var entity = new Contact
        {
            Name = name,
            Email = email,
            CreatedAt = DateTime.UtcNow
        };
        _db.Contacts.Add(entity);
        await _db.SaveChangesAsync();

        return new ContactDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Email = entity.Email,
            CreatedAt = entity.CreatedAt
        };
    }
}
