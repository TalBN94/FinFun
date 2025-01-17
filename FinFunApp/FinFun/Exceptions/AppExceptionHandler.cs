using FinFunApp.Errors;
using Microsoft.AspNetCore.Diagnostics;

namespace FinFunApp.Exceptions;

public class AppExceptionHandler : IExceptionHandler
{
    public ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is ExpenseNotFoundException)
        {
            var response = new BaseErrorResponse();
            const int code = StatusCodes.Status404NotFound;
            httpContext.Response.StatusCode = code;
            response.Code = code;
            response.Message = exception.Message;
            httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
            return new ValueTask<bool>(true);
        }

        return ValueTask.FromResult(false);
    }
}