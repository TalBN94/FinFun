using FinFunApp.Model;

namespace FinFunApp.Data;

public sealed class InMemDB
{
    private readonly Dictionary<string, Expense> _expenses;

    static InMemDB()
    {
        
    }

    private InMemDB()
    {
        _expenses = new Dictionary<string, Expense>();
    }

    public List<Expense> GetAll()
    {
        return _expenses.Values.ToList();
    }

    public Expense Get(string id)
    {
        if (!_expenses.ContainsKey(id))
        {
            return null;
        }
        return _expenses[id];
    }

    public void Save(Expense expense)
    {
        _expenses[expense.id] = expense;
    }

    public static InMemDB Instance { get; } = new InMemDB();
}