using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EarlyCareersPortal.Api.Controllers;

/// <summary>
/// Manages contact information for early career team members and mentors
/// </summary>
[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly IContactService _service;

    public ContactsController(IContactService service) => _service = service;

    /// <summary>
    /// Retrieves all contacts
    /// </summary>
    /// <returns>List of all contacts with name, email, and creation date</returns>
    /// <response code="200">Returns the list of contacts</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ContactDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAll());

    /// <summary>
    /// Adds a new contact to the system
    /// </summary>
    /// <param name="dto">Contact details including name and email</param>
    /// <returns>The newly created contact</returns>
    /// <response code="200">Contact successfully created</response>
    /// <response code="400">Invalid contact data provided</response>
    [HttpPost]
    [ProducesResponseType(typeof(ContactDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateContactDto dto)
    {
        var contact = await _service.Create(dto.Name, dto.Email);
        return Ok(contact);
    }
}

/// <summary>
/// DTO for creating a new contact
/// </summary>
/// <param name="Name">Full name of the contact</param>
/// <param name="Email">Email address of the contact</param>
public record CreateContactDto(string Name, string Email);
