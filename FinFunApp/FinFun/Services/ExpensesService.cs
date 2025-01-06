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
        return InMemDB.Instance.GetAll();
    }

    public Expense Get(string id)
    {
        var expense = InMemDB.Instance.Get(id);
        return expense;
    }

    public void Create(Expense expense)
    {
        expense.id = Guid.NewGuid().ToString();
        InMemDB.Instance.Save(expense);
    }

    public void Delete(string id)
    {
        InMemDB.Instance.Delete(id);
    }
}