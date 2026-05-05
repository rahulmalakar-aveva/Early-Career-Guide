using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IUsefulLinkService
{
    Task<List<UsefulLinkDto>> GetAll();
    Task Add(CreateUsefulLinkDto dto);
}