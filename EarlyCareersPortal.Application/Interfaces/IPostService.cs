using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IPostService
{
    Task<List<BlogPostDto>> GetByType(string type);
    Task Add(CreateBlogPostDto dto);
    Task Like(Guid id);
    Task<BlogPostDto?> Update(Guid id, CreateBlogPostDto dto);
    Task<bool> Delete(Guid id);
}