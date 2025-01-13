using System.ComponentModel.DataAnnotations;

namespace FinFunApp.Model;

public class Expense
{
    public string? Id { get; set; }
    [Required]
    public int? Amount { get; set; }
    public string? Description { get; set; }
    [Required]
    public string? Category { get; set; }
    [Required]
    public DateTime? Date { get; set; }
}