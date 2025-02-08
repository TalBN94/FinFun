using FinFunApp.Data;
using FinFunApp.Services;
using Microsoft.Extensions.Logging;
using Moq;

namespace Test.Services;

public class ExpensesServiceTest
{
    private ExpensesService _service;
    
    [SetUp]
    public void Setup()
    {
        var loggerMock = new Mock<ILogger<ExpensesService>>();
        _service = new ExpensesService(loggerMock.Object);
    }

    [Test]
    public void CreateExpenseHappyPathTest()
    {
        ExpenseRequest request = new ExpenseRequest()
        {
            Amount = 100,
            Category = "Mock category",
            Description = "Mock expense",
            Date = DateOnly.FromDateTime(DateTime.Now)
        };

        var created = _service.Create(request);
        Assert.That(created, Is.Not.Null);
        Assert.That(created.Id, Is.Not.Empty);
        Assert.That(created.Amount, Is.EqualTo(request.Amount));
        Assert.That(created.Category, Is.EqualTo(request.Category));
        Assert.That(created.Description, Is.EqualTo(request.Description));
        Assert.That(created.Date, Is.EqualTo(request.Date));
    }
}