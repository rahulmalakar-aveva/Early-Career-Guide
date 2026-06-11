namespace EarlyCareersPortal.Application.Dtos;

public record PeerSessionDto(int Id, string Title, string JoinLink, DateTime CreatedAt);
public record CreatePeerSessionDto(string Title, string JoinLink);
