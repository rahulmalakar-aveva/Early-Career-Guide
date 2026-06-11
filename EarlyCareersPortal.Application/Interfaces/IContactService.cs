using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IContactService
{
    Task<List<ContactDto>> GetAll();
    Task<ContactDto> Create(string name, string email);
    Task<ContactDto?> Update(int id, string name, string email);
    Task<bool> Delete(int id);
}
