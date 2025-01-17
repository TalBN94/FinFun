using System.Text.Json.Serialization;

namespace FinFunApp.Errors;

public class BaseErrorDetailsResponse : BaseErrorResponse
{
    [JsonPropertyOrder(2)]
    public List<ErrorDetail> Errors { get; set; }
}