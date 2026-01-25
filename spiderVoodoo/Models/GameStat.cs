public class GameStat
{
     public Guid Id { get; set; }
     public Guid UserId { get; set; }
     public Guid GameId { get; set; }
     public string StatType { get; set; } = string.Empty;
     public int Value { get; set; }
}