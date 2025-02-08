using FinFunApp.Data;
using FinFunApp.Exceptions;
using FinFunApp.Model;

namespace Test.Data;

public class InMemDbTest
{
    [SetUp]
    public void Setup()
    {
        // Clear the data for each test
        InMemDb.Instance.Reset();
    }
    
    [Test]
    public void CrateAndGetExpenseByIdTest()
    {
        var expense = BuildExpense();
        InMemDb.Instance.Save(expense);
        var fetched = InMemDb.Instance.Get(expense.Id);
        Assert.That(fetched, Is.EqualTo(expense));
    }

    [Test]
    public void GetExpenseDoesNotExistShouldThrowTest()
    {
        Assert.Throws<ExpenseNotFoundException>(() => InMemDb.Instance.Get(Guid.NewGuid()));
    }

    [Test]
    public void GetAllTest()
    {
        Assert.That(InMemDb.Instance.GetAll(), Is.Not.Null);
        Assert.That(InMemDb.Instance.GetAll(), Is.Empty);

        var expense1 = BuildExpense();
        var expense2 = BuildExpense();
        var expense3 = BuildExpense();
        InMemDb.Instance.Save(expense1);
        InMemDb.Instance.Save(expense2);
        InMemDb.Instance.Save(expense3);

        var expenses = InMemDb.Instance.GetAll();
        Assert.That(expenses, Has.Exactly(3).Items);
        Assert.That(expenses, Is.EquivalentTo(new[] { expense1, expense2, expense3 }));
    }

    [Test]
    public void DeleteHappyPathTest()
    {
        var expense = BuildExpense();
        InMemDb.Instance.Save(expense);
        Assert.That(InMemDb.Instance.GetAll(), Is.EquivalentTo(new[] { expense }));

        InMemDb.Instance.Delete(expense.Id);
        Assert.That(InMemDb.Instance.GetAll(), Is.Empty);
    }

    [Test]
    public void DeleteNonExistingExpenseShouldDoNothingTest()
    {
        var expense = BuildExpense();
        InMemDb.Instance.Save(expense);
        Assert.That(InMemDb.Instance.GetAll(), Is.EquivalentTo(new[] { expense }));
        
        InMemDb.Instance.Delete(Guid.NewGuid());
        Assert.That(InMemDb.Instance.GetAll(), Is.EquivalentTo(new[] { expense }));
    }

    private static Expense BuildExpense()
    {
        return new Expense
        {
            Id = Guid.NewGuid(),
            Amount = 100,
            Category = "mock category",
            Description = "mock description",
            Date = DateOnly.FromDateTime(DateTime.Now)
        };
    }
}