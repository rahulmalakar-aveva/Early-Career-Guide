using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IQnaService
{
    Task<List<QnaDto>> GetAll();
    Task<QnaDto> Create(CreateQnaDto dto);
    Task<QnaDto?> Answer(Guid id, AnswerQnaDto dto);
    Task<bool> Delete(Guid id);
}