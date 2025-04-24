using FinFunApp.Data;
using FinFunApp.Model;
using FinFunApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;

namespace Test.Services;

public class ExpensesServiceTest
{
    private Expense mockExpense1;
    private Expense mockExpense2;
    private Mock<FinFunDbContext> _dbContext;
    private Mock<DbSet<Expense>> _mockSet;
    private ExpensesService _service;
    
    [SetUp]
    public void Setup()
    {
        var loggerMock = new Mock<ILogger<ExpensesService>>();
        // Sample test data
        // Set up a list of expenses that will act as the data source
        mockExpense1 = new Expense {
            Id = Guid.NewGuid(),
            Description = "Groceries",
            Amount = 150,
            Date = null,
            Category = null
        };
        
        mockExpense2 = new Expense {
            Id = Guid.NewGuid(),
            Description = "Rent",
            Amount = 1000,
            Category = null,
            Date = null
        };
        var expensesData = new List<Expense> { mockExpense1, mockExpense2 }.AsQueryable();

        // Create a mock DbSet<Expense>
        _mockSet = new Mock<DbSet<Expense>>();

        // Set up IQueryable methods for the mock DbSet
        _mockSet.As<IQueryable<Expense>>().Setup(m => m.Provider).Returns(expensesData.Provider);
        _mockSet.As<IQueryable<Expense>>().Setup(m => m.Expression).Returns(expensesData.Expression);
        _mockSet.As<IQueryable<Expense>>().Setup(m => m.ElementType).Returns(expensesData.ElementType);
        _mockSet.As<IQueryable<Expense>>().Setup(m => m.GetEnumerator()).Returns(expensesData.GetEnumerator());

        _mockSet.Setup(m => m.Find(It.IsAny<object[]>())).Returns<object[]>(ids => expensesData.FirstOrDefault(e => e.Id == (Guid)ids[0]));

        // Set up the Remove method to simulate entity removal
        _mockSet.Setup(m => m.Remove(It.IsAny<Expense>()));
        
        // Mock the context
        var options = new DbContextOptionsBuilder<FinFunDbContext>()
            .Options;
        _dbContext = new Mock<FinFunDbContext>(options);
        _dbContext.Setup(c => c.Expenses).Returns(_mockSet.Object);
        _service = new ExpensesService(loggerMock.Object, _dbContext.Object);
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
        _dbContext.Verify(db => db.Expenses.Add(created), Times.Once);
        _dbContext.Verify(db => db.SaveChanges(), Times.Once);
    }

    [Test]
    public void GetAllExpensesTest()
    {
        var expenses = _service.GetAll();
        Assert.That(expenses, Is.Not.Null);
        Assert.That(expenses, Is.Not.Empty);
        var expense1 = expenses[0];
        var expense2 = expenses[1];
        Assert.That(expense1, Is.Not.Null);
        Assert.That(expense1, Is.EqualTo(mockExpense1));
        Assert.That(expense2, Is.EqualTo(mockExpense2));
    }
    
    [Test]
    public void GetExpenseByIdHappyPathTest()
    {
        var expense = _service.Get(mockExpense1.Id);
        Assert.That(expense, Is.Not.Null);
        Assert.That(expense, Is.EqualTo(mockExpense1));
        
        expense = _service.Get(mockExpense2.Id);
        Assert.That(expense, Is.Not.Null);
        Assert.That(expense, Is.EqualTo(mockExpense2));
    }
        
    [Test]
    public void GetExpenseByIdNotFoundTest()
    {
        var expense = _service.Get(Guid.NewGuid());
        Assert.That(expense, Is.Null);
    }

    [Test]
    public void DeleteExpenseHappyPathTest()
    {
        _service.Delete(mockExpense1.Id);
        _dbContext.Verify(db => db.Expenses.Find(It.Is(mockExpense1.Id, EqualityComparer<Guid>.Default)), Times.Once);
        _dbContext.Verify(db => db.Expenses.Remove(It.Is<Expense>(e => e.Id.Equals(mockExpense1.Id))), Times.Once);
    }
}