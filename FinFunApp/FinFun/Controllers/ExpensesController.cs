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

    public ExpensesController(ILogger<ExpensesController> logger, IConfiguration Configuration)
    {
        _logger = logger;
        _configuration = Configuration;
        _service = new ExpensesService();
    }

    [HttpGet]
    [ProducesResponseType<List<Expense>>(StatusCodes.Status200OK)]
    public IActionResult GetAll()
    {
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
    public IActionResult Create([FromBody] Expense expense)
    {
        var created = _service.Create(expense);
        var location = Url.Action(nameof(Create).ToLower(),  $"/{expense.id}");

        return CreatedAtAction("GetById", new { id = expense.id }, expense);
    }
}