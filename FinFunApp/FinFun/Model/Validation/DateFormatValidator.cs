using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace FinFunApp.Model.Validation;

public class DateFormatValidator() : ValidationAttribute(GetErrorMessage())
{
    private static string GetErrorMessage() => "date must be in the format of yyyy-mm-dd.";

    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        if (value?.ToString() == null)
        {
            return new ValidationResult("date is required");
        }
        
        var dateString = value.ToString();

        DateTime parsedDate;
        if (!DateTime.TryParseExact(dateString, "yyyy-MM-dd", null, DateTimeStyles.None, out parsedDate))
        {
            return new ValidationResult(GetErrorMessage());
        }

        return ValidationResult.Success;
    }
}