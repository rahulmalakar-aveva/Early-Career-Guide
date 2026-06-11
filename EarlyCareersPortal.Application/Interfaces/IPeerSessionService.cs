using EarlyCareersPortal.Application.Dtos;

namespace EarlyCareersPortal.Application.Interfaces;

public interface IPeerSessionService
{
    Task<List<PeerSessionDto>> GetAll();
    Task<PeerSessionDto> Create(CreatePeerSessionDto dto);
    Task<PeerSessionDto?> Update(int id, CreatePeerSessionDto dto);
    Task<bool> Delete(int id);
}
