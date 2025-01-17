using Microsoft.AspNetCore.Mvc;

namespace FinFunApp.Errors;

public class ModelValidationErrorResponse : BaseErrorDetailsResponse
{
    public static IActionResult GenerateResponse(ActionContext actionContext)
    {
        var apiError = new ModelValidationErrorResponse();
        apiError.Code = StatusCodes.Status400BadRequest;
        apiError.Title = "Bad Request";
        apiError.Message = "Validation errors found";
        var errors = actionContext.ModelState.AsEnumerable();

        foreach (var error in errors)
        {
            foreach (var inner in error.Value!.Errors)
            {
                apiError.Errors ??= [];
                var details = new ErrorDetail();
                details.Target = error.Key.ToLower();
                details.Message = inner.ErrorMessage;
                apiError.Errors.Add(details);
            }
        }
        return new BadRequestObjectResult(apiError);
    }
}