namespace FinFunApp.Model;

public class Expense
{
    public required string Id { get; init; }
    
    public required int? Amount { get; set; }
    
    public string? Description { get; set; }
    
    public required string? Category { get; set; }
    
    public required DateOnly? Date { get; set; }
}