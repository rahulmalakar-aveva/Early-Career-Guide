using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Services;
using EarlyCareersPortal.Infrastructure.Persistence;
using EarlyCareersPortal.Application.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/qna")]
public class QnaController : ControllerBase
{
    private readonly IQnaService _service;

    public QnaController(IQnaService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _service.GetAll());
}