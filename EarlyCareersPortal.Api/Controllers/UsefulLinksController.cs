using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Services;
using EarlyCareersPortal.Infrastructure.Persistence;
using EarlyCareersPortal.Application.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/useful-links")]
public class UsefulLinksController : ControllerBase
{
    private readonly IUsefulLinkService _service;

    public UsefulLinksController(IUsefulLinkService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _service.GetAll());

    [HttpPost]
    public async Task<IActionResult> Post(CreateUsefulLinkDto dto)
    {
        await _service.Add(dto);
        return Ok();
    }
}