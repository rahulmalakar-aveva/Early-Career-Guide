namespace EarlyCareersPortal.Application.Dtos;

public record UsefulLinkDto(Guid Id, string Title, string Url, string Category);
public record CreateUsefulLinkDto(string Title, string Url, string Category);