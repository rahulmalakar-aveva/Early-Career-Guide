using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EarlyCareersPortal.Api.Controllers;

[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly IContactService _service;

    public ContactsController(IContactService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAll());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateContactDto dto)
    {
        var contact = await _service.Create(dto.Name, dto.Email);
        return Ok(contact);
    }
}

public record CreateContactDto(string Name, string Email);
