using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FinFunApp.Filters;

public class LoggingFilter(ILogger<LoggingFilter> logger) : IActionFilter
{
    private static string RequestLogFormat = """
                                             HTTP Request Information:
                                                 Path: {}
                                                 Method: {}
                                             """;
    
    public void OnActionExecuting(ActionExecutingContext context)
    {
        var request = context.HttpContext.Request;
        if (request.Method is "POST" or "PUT" or "PATCH")
        {
            LogRequestWithBody(context);
        }
        else
        {
            LogRequest(context);
        }
    }

    private void LogRequestWithBody(ActionExecutingContext context)
    {
        var request = context.HttpContext.Request;
        var requestBody = GetRequestBody(context);
        logger.LogInformation("""
                              HTTP Request Information:
                                  Path: {}
                                  Method: {},
                                  Body: {}
                              """,
            request.Path,
            request.Method,
            requestBody
        );
    }

    private void LogRequest(ActionExecutingContext context)
    {
        var request = context.HttpContext.Request;
        logger.LogInformation("""
                              HTTP Request Information:
                                  Path: {}
                                  Method: {}
                              """,
            request.Path,
            request.Method
            );
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // TODO: implement response logging
    }
    
    private static object? GetRequestBody(ActionExecutingContext context)
    {
        var actionParams = context.ActionDescriptor.Parameters;
        object? requestBody = null;
        if (actionParams is not { Count: > 0 }) return requestBody;
        
        foreach (var actionParam in actionParams)
        {
            if (actionParam is not ControllerParameterDescriptor descriptor)
            {
                continue;
            }
                
            foreach (var attributeData in descriptor.ParameterInfo.GetCustomAttributes())
            {
                if (attributeData is not FromBodyAttribute) continue;
                context.ActionArguments.TryGetValue(descriptor.Name, out requestBody);
            }
        }
        return requestBody;
    }
}