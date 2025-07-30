using FinFunApp.Data;
using FinFunApp.Model;
using FinFunApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;

namespace Test.Services;

public class IncomesServiceTest
{
    private Income mockIncome1;
    private Income mockIncome2;
    private Mock<FinFunDbContext> _dbContext;
    private Mock<DbSet<Income>> _mockSet;
    private IncomesService _service;
    
    [SetUp]
    public void Setup()
    {
        var loggerMock = new Mock<ILogger<IncomesService>>();
        // Sample test data
        // Set up a list of incomes that will act as the data source
        mockIncome1 = new Income {
            Id = Guid.NewGuid(),
            Description = "Groceries",
            Amount = 150,
            Date = null,
            Category = null
        };
        
        mockIncome2 = new Income {
            Id = Guid.NewGuid(),
            Description = "Rent",
            Amount = 1000,
            Category = null,
            Date = null
        };
        var incomesData = new List<Income> { mockIncome1, mockIncome2 }.AsQueryable();

        // Create a mock DbSet<Income>
        _mockSet = new Mock<DbSet<Income>>();

        // Set up IQueryable methods for the mock DbSet
        _mockSet.As<IQueryable<Income>>().Setup(m => m.Provider).Returns(incomesData.Provider);
        _mockSet.As<IQueryable<Income>>().Setup(m => m.Expression).Returns(incomesData.Expression);
        _mockSet.As<IQueryable<Income>>().Setup(m => m.ElementType).Returns(incomesData.ElementType);
        _mockSet.As<IQueryable<Income>>().Setup(m => m.GetEnumerator()).Returns(incomesData.GetEnumerator());

        _mockSet.Setup(m => m.Find(It.IsAny<object[]>())).Returns<object[]>(ids => incomesData.FirstOrDefault(e => e.Id == (Guid)ids[0]));

        // Set up the Remove method to simulate entity removal
        _mockSet.Setup(m => m.Remove(It.IsAny<Income>()));
        
        // Mock the context
        var options = new DbContextOptionsBuilder<FinFunDbContext>()
            .Options;
        _dbContext = new Mock<FinFunDbContext>(options);
        _dbContext.Setup(c => c.Incomes).Returns(_mockSet.Object);
        _service = new IncomesService(loggerMock.Object, _dbContext.Object);
    }

    [Test]
    public void CreateIncomeHappyPathTest()
    {
        IncomeRequest request = new IncomeRequest()
        {
            Amount = 100,
            Category = "Mock category",
            Description = "Mock Income",
            Date = DateOnly.FromDateTime(DateTime.Now)
        };

        var created = _service.Create(request);
        Assert.That(created, Is.Not.Null);
        Assert.That(created.Id, Is.Not.Empty);
        Assert.That(created.Amount, Is.EqualTo(request.Amount));
        Assert.That(created.Category, Is.EqualTo(request.Category));
        Assert.That(created.Description, Is.EqualTo(request.Description));
        Assert.That(created.Date, Is.EqualTo(request.Date));
        _dbContext.Verify(db => db.Incomes.Add(created), Times.Once);
        _dbContext.Verify(db => db.SaveChanges(), Times.Once);
    }

    [Test]
    public void GetAllIncomesTest()
    {
        var Incomes = _service.GetAll();
        Assert.That(Incomes, Is.Not.Null);
        Assert.That(Incomes, Is.Not.Empty);
        var Income1 = Incomes[0];
        var Income2 = Incomes[1];
        Assert.That(Income1, Is.Not.Null);
        Assert.That(Income1, Is.EqualTo(mockIncome1));
        Assert.That(Income2, Is.EqualTo(mockIncome2));
    }
    
    [Test]
    public void GetIncomeByIdHappyPathTest()
    {
        var Income = _service.Get(mockIncome1.Id);
        Assert.That(Income, Is.Not.Null);
        Assert.That(Income, Is.EqualTo(mockIncome1));
        
        Income = _service.Get(mockIncome2.Id);
        Assert.That(Income, Is.Not.Null);
        Assert.That(Income, Is.EqualTo(mockIncome2));
    }
        
    [Test]
    public void GetIncomeByIdNotFoundTest()
    {
        var Income = _service.Get(Guid.NewGuid());
        Assert.That(Income, Is.Null);
    }

    [Test]
    public void DeleteIncomeHappyPathTest()
    {
        _service.Delete(mockIncome1.Id);
        _dbContext.Verify(db => db.Incomes.Find(It.Is(mockIncome1.Id, EqualityComparer<Guid>.Default)), Times.Once);
        _dbContext.Verify(db => db.Incomes.Remove(It.Is<Income>(e => e.Id.Equals(mockIncome1.Id))), Times.Once);
    }
}