using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using EarlyCareersPortal.Domain.Enums;
using EarlyCareersPortal.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EarlyCareersPortal.Application.Services;

public class PostService : IPostService
{
    private readonly AppDbContext _db;

    public PostService(AppDbContext db) => _db = db;

    public async Task<List<BlogPostDto>> GetByType(string type)
    {
        var enumType = type == "tip" ? PostType.Tip : PostType.JuniorQuestion;

        return await _db.BlogPosts
            .Where(x => x.Type == enumType)
            .Select(x => new BlogPostDto(
                x.Id, x.Title, x.Content, x.AuthorName, x.Likes, x.Type.ToString()))
            .ToListAsync();
    }

    public async Task Add(CreateBlogPostDto dto)
    {
        var type = dto.Type == "tip" ? PostType.Tip : PostType.JuniorQuestion;

        _db.BlogPosts.Add(new()
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Content = dto.Content,
            AuthorName = dto.AuthorName,
            Type = type
        });

        await _db.SaveChangesAsync();
    }

    public async Task Like(Guid id)
    {
        var post = await _db.BlogPosts.FindAsync(id);
        if (post == null) return;

        post.Likes++;
        await _db.SaveChangesAsync();
    }
}