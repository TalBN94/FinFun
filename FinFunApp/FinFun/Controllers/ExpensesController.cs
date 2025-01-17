using FinFunApp.Data;
using FinFunApp.Model;
using FinFunApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinFunApp.Controllers;

[ApiController]
[Route("[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly ILogger<ExpensesController> _logger;
    private readonly IConfiguration _configuration;
    private readonly ExpensesService _service;

    public ExpensesController(ILogger<ExpensesController> logger, IConfiguration Configuration, ExpensesService service)
    {
        _logger = logger;
        _configuration = Configuration;
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType<List<Expense>>(StatusCodes.Status200OK)]
    public IActionResult GetAll()
    {
        _logger.LogInformation("Get all expenses");
        return Ok(_service.GetAll());
    }

    [HttpGet("{id}")]
    [ProducesResponseType<Expense>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetById(string id)
    {
        var expense = _service.Get(id);
        return expense == null ? NotFound() : Ok(expense);
    }

    [HttpPost]
    [ProducesResponseType<Expense>(StatusCodes.Status201Created)]
    public IActionResult Create([FromBody] ExpenseRequest? expenseDto)
    {
        var expense = _service.Create(expenseDto);

        return CreatedAtAction("GetById", new { id = expense.Id }, expense);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public IActionResult Delete(string id)
    {
        _service.Delete(id);
        return NoContent();
    }
}