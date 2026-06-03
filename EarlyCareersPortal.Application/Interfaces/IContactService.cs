using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IContactService
{
    Task<List<ContactDto>> GetAll();
    Task<ContactDto> Create(string name, string email);
}
