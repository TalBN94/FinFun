using FinFunApp.Data;
using FinFunApp.Model;
using FinFunApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinFunApp.Controllers;

[ApiController]
[Route("[controller]")]
public class IncomesController : ControllerBase
{
    private readonly ILogger<ExpensesController> _logger;
    private readonly IConfiguration _configuration;
    private readonly IncomesService _service;

    public IncomesController(ILogger<ExpensesController> logger, IConfiguration Configuration, IncomesService service)
    {
        _logger = logger;
        _configuration = Configuration;
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType<List<Income>>(StatusCodes.Status200OK)]
    public IActionResult GetAll()
    {
        _logger.LogInformation("Get all incomes");
        return Ok(_service.GetAll());
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType<Income>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetById(Guid id)
    {
        var income = _service.Get(id);
        return Ok(income);
    }

    [HttpPost]
    [ProducesResponseType<Income>(StatusCodes.Status201Created)]
    public IActionResult Create([FromBody] IncomeRequest? incomeDto)
    {
        var income = _service.Create(incomeDto);

        return CreatedAtAction("GetById", new { id = income.Id }, income);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public IActionResult Delete(Guid id)
    {
        _service.Delete(id);
        return NoContent();
    }
}