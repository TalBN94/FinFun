using System.ComponentModel.DataAnnotations;
using FinFunApp.Model.Validation;

namespace FinFunApp.Model;

public class Expense
{
    public string? Id { get; set; }
    
    [Required(ErrorMessage = "amount is required")]
    [Range(0, int.MaxValue, ErrorMessage = "amount must be greater than zero")]
    public int? Amount { get; set; }
    
    [StringLength(200, ErrorMessage = "description is too long")]
    public string? Description { get; set; }
    
    [Required(ErrorMessage = "category is required")]
    public string? Category { get; set; }
    
    [Required(ErrorMessage = "date is required")]
    [DateFormatValidator]
    public DateTime? Date { get; set; }
}