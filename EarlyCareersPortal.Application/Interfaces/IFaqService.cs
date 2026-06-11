using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IFaqService
{
    Task<List<FaqDto>> GetAll();
    Task<List<FaqDto>> GetByCategory(string category);
    Task<FaqDto> Create(CreateFaqDto dto);
    Task<FaqDto?> Update(int id, CreateFaqDto dto);
    Task<bool> Delete(int id);
}
