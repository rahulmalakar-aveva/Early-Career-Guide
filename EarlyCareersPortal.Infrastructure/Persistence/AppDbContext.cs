using Microsoft.EntityFrameworkCore;
using EarlyCareersPortal.Domain.Entities;

namespace EarlyCareersPortal.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<UsefulLink> UsefulLinks => Set<UsefulLink>();
    public DbSet<QnaItem> QnaItems => Set<QnaItem>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
}