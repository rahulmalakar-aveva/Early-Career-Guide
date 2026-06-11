using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/useful-links")]
public class UsefulLinksController : ControllerBase
{
    private readonly IUsefulLinkService _service;

    public UsefulLinksController(IUsefulLinkService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAll());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUsefulLinkDto dto)
    {
        var result = await _service.Create(dto);
        return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateUsefulLinkDto dto)
    {
        var result = await _service.Update(id, dto);
        return result is not null ? Ok(result) : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _service.Delete(id);
        return deleted ? NoContent() : NotFound();
    }
}
