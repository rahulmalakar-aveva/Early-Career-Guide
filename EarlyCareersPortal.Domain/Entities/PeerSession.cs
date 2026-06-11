namespace EarlyCareersPortal.Domain.Entities;

public class PeerSession
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string JoinLink { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
