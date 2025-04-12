namespace FinFunApp.Model;

public class Expense
{
    public required Guid Id { get; init; }
    
    public required Double? Amount { get; set; }
    
    public string? Description { get; set; }
    
    public required string? Category { get; set; }

    public required DateOnly? Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);
}