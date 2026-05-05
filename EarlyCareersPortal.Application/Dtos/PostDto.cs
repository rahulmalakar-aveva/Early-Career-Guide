namespace EarlyCareersPortal.Application.Dtos;

public record BlogPostDto(Guid Id, string Title, string Content, string AuthorName, int Likes, string Type);
public record CreateBlogPostDto(string Title, string Content, string AuthorName, string Type);