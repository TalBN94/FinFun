using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FinFunApp.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : ControllerBase
{
    private static readonly string[] Names = ["Krespi, Sibony, Barney"];
    private readonly ILogger<TransactionController> _logger;
    private readonly IConfiguration _configuration;

    public TransactionController(ILogger<TransactionController> logger, IConfiguration Configuration)
    {
        _logger = logger;
        _configuration = Configuration;
    }

    [HttpGet("names")]
    public IEnumerable<string> OurNames()
    {
        _logger.LogInformation("Get was called");
        _logger.LogInformation("{}", _configuration["customConfig"]);
        return Names;
    }
}