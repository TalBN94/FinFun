using FinFunApp.Data;
using FinFunApp.Model;

namespace FinFunApp.Services;

public class ExpensesService(ILogger<ExpensesService> logger)
{

    public List<Expense> GetAll()
    {
        logger.LogInformation("Fetching all expenses");
        return InMemDb.Instance.GetAll();
    }

    public Expense Get(string id)
    {
        logger.LogInformation("Fetching expense {}", id);
        var expense = InMemDb.Instance.Get(id);
        return expense;
    }

    public Expense Create(ExpenseRequest expenseRequest)
    {
        logger.LogInformation("Creating new expense");
        
        var expense = new Expense()
        {
            Id = Guid.NewGuid().ToString(),
            Amount = expenseRequest.Amount,
            Category = expenseRequest.Category,
            Description = expenseRequest.Description ?? string.Empty,
            Date = expenseRequest.Date,
        };
        InMemDb.Instance.Save(expense);
        return expense;
    }

    public void Delete(string id)
    {
        logger.LogInformation("Deleting expense {}", id);
        InMemDb.Instance.Delete(id);
    }
}