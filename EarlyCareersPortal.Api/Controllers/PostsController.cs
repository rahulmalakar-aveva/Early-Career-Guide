using EarlyCareersPortal.Application.Interfaces;
using EarlyCareersPortal.Application.Services;
using EarlyCareersPortal.Infrastructure.Persistence;
using EarlyCareersPortal.Application.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly IPostService _service;

    public PostsController(IPostService service) => _service = service;

    [HttpGet("{type}")]
    public async Task<IActionResult> GetByType(string type) => Ok(await _service.GetByType(type));

    [HttpPost]
    public async Task<IActionResult> Post(CreateBlogPostDto dto)
    {
        await _service.Add(dto);
        return Ok();
    }

    [HttpPost("like/{id}")]
    public async Task<IActionResult> Like(Guid id)
    {
        await _service.Like(id);
        return Ok();
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateBlogPostDto dto)
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

