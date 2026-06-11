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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateQnaDto dto)
    {
        var result = await _service.Create(dto);
        return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}/answer")]
    public async Task<IActionResult> Answer(Guid id, [FromBody] AnswerQnaDto dto)
    {
        var result = await _service.Answer(id, dto);
        if (result is null) return NotFound();
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _service.Delete(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}