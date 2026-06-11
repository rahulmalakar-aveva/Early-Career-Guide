using EarlyCareersPortal.Domain.Enums;

namespace EarlyCareersPortal.Domain.Entities;

public class BlogPost
{
    public Guid Id { get; set; }
    public PostType Type { get; set; }
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public string AuthorName { get; set; } = "";
    public int Likes { get; set; }
}