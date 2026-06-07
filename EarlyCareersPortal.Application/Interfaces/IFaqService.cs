using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IFaqService
{
    Task<List<FaqDto>> GetAll();
    Task<List<FaqDto>> GetByCategory(string category);
}
