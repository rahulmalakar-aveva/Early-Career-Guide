namespace EarlyCareersPortal.Application.Dtos;

public class FaqDto
{
    public int Id { get; set; }
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
