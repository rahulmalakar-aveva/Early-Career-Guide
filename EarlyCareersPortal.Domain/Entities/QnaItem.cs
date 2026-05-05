namespace EarlyCareersPortal.Domain.Entities;

public class QnaItem
{
	public Guid Id { get; set; }
	public string Question { get; set; } = "";
	public string Answer { get; set; } = "";
}