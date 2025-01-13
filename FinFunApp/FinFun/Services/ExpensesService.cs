using FinFunApp.Data;
using FinFunApp.Model;

namespace FinFunApp.Services;

public class ExpensesService
{

    public ExpensesService()
    {
        
    }

    public List<Expense> GetAll()
    {
        return InMemDb.Instance.GetAll();
    }

    public Expense Get(string id)
    {
        var expense = InMemDb.Instance.Get(id);
        return expense;
    }

    public void Create(Expense expense)
    {
        expense.Id = Guid.NewGuid().ToString();
        InMemDb.Instance.Save(expense);
    }

    public void Delete(string id)
    {
        InMemDb.Instance.Delete(id);
    }
}