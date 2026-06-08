using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EarlyCareersPortal.Api.Controllers;

[ApiController]
[Route("api/faqs")]
public class FaqsController : ControllerBase
{
    private readonly IFaqService _service;

    public FaqsController(IFaqService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAll());

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category) => Ok(await _service.GetByCategory(category));
}
