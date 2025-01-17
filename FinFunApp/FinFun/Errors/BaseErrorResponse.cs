using System.Text.Json.Serialization;

namespace FinFunApp.Errors;

public class BaseErrorResponse
{
    [JsonPropertyOrder(0)]
    public int Code { get; set; }
    
    [JsonPropertyOrder(1)]
    public string Message { get; set; }
}