using System.Text.Json.Serialization;

namespace FinFunApp.Errors;

public class BaseErrorDetailsResponse : BaseErrorResponse
{
    [JsonPropertyOrder(3)]
    public List<ErrorDetail> Errors { get; set; }
}