namespace EarlyCareersPortal.Domain.Entities;

public class UsefulLink
{
	public Guid Id { get; set; }
	public string Title { get; set; } = "";
	public string Url { get; set; } = "";
	public string Category { get; set; } = "";
}