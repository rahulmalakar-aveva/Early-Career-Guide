namespace EarlyCareersPortal.Application.Dtos;

public record QnaDto(Guid Id, string Question, string? Answer);

public record CreateQnaDto(string Question);

public record AnswerQnaDto(string Answer);