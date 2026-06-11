using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IUsefulLinkService
{
    Task<List<UsefulLinkDto>> GetAll();
    Task<UsefulLinkDto> Create(CreateUsefulLinkDto dto);
    Task<UsefulLinkDto?> Update(Guid id, CreateUsefulLinkDto dto);
    Task<bool> Delete(Guid id);
}
