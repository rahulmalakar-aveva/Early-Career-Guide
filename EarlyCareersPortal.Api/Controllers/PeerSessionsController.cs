using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EarlyCareersPortal.Api.Controllers;

[ApiController]
[Route("api/peer-sessions")]
public class PeerSessionsController : ControllerBase
{
    private readonly IPeerSessionService _service;

    public PeerSessionsController(IPeerSessionService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAll());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePeerSessionDto dto)
    {
        var result = await _service.Create(dto);
        return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreatePeerSessionDto dto)
    {
        var result = await _service.Update(id, dto);
        return result is not null ? Ok(result) : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.Delete(id);
        return deleted ? NoContent() : NotFound();
    }
}
