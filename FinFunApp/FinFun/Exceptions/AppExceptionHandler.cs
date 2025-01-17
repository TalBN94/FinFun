using FinFunApp.Errors;
using Microsoft.AspNetCore.Diagnostics;

namespace FinFunApp.Exceptions;

public class AppExceptionHandler : IExceptionHandler
{
    public ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var response = new BaseErrorResponse();
        int code;
        if (exception is ExpenseNotFoundException)
        {
            code = StatusCodes.Status404NotFound;
            response.Code = code;
            response.Title = "Not Found";
            response.Message = exception.Message;
        }
        else
        {
            code = StatusCodes.Status500InternalServerError;
            response.Code = code;
            response.Title = "Internal Server Error";
            response.Message = "An unexpected error occurred";
        }
        
        
        httpContext.Response.StatusCode = code;
        httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
        return new ValueTask<bool>(true);
    }
}