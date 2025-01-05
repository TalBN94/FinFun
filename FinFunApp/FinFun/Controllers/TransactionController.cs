using Microsoft.AspNetCore.Mvc;

namespace FinFunApp.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : ControllerBase
{
    private static readonly string[] Names = ["Krespi, Sibony, Barney"];
    private readonly ILogger<TransactionController> _logger;

    public TransactionController(ILogger<TransactionController> logger)
    {
        _logger = logger;
    }

    [HttpGet("names")]
    public IEnumerable<string> OurNames()
    {
        _logger.LogInformation("Get was called");
        return Names;
    }
}