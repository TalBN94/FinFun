using FinFunApp.Exceptions;
using FinFunApp.Model;

namespace FinFunApp.Data;

public sealed class InMemDb
{
    private readonly Dictionary<Guid, Expense> _expenses;

    static InMemDb()
    {
        
    }

    private InMemDb()
    {
        _expenses = new Dictionary<Guid, Expense>();
    }

    public List<Expense> GetAll()
    {
        return _expenses.Values.ToList();
    }

    public Expense Get(Guid id)
    {
        if (!_expenses.TryGetValue(id, out var expense))
        {
            throw new ExpenseNotFoundException();
        }
        return expense;
    }

    public void Save(Expense expense)
    {
        if (expense.Id == null)
            throw new ArgumentNullException(nameof(expense));
        _expenses[expense.Id] = expense;
    }

    public void Delete(Guid id)
    {
        _expenses.Remove(id);
    }

    // Used for testing
    public void Reset()
    {
        _expenses.Clear();
    }

    public static InMemDb Instance { get; } = new InMemDb();
}