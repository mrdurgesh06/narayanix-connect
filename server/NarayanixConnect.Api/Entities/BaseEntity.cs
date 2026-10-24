namespace NarayanixConnect.Api.Entities;

public abstract class BaseEntity
{
    public int Id { get; set; }

    // Both are UTC. They are filled in AppDbContext.SaveChanges, never by callers.
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
