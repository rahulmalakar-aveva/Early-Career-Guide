using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IQnaService
{
    Task<List<QnaDto>> GetAll();
}