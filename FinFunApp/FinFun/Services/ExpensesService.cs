using FinFunApp.Data;
using FinFunApp.DB;
using FinFunApp.Model;

namespace FinFunApp.Services;

public class ExpensesService(ILogger<ExpensesService> logger, FinFunDbContext context)
{
    private readonly FinFunDbContext _context = context;

    public List<Expense> GetAll()
    {
        logger.LogInformation("Fetching all expenses");
        return _context.Expenses.ToList();
    }

    public Expense Get(Guid id)
    {
        logger.LogInformation("Fetching expense {}", id);
        var expense = context.Expenses.Find(id);
        return expense;
    }

    public Expense Create(ExpenseRequest expenseRequest)
    {
        logger.LogInformation("Creating new expense");
        
        var expense = new Expense()
        {
            Id = Guid.NewGuid(),
            Amount = expenseRequest.Amount,
            Category = expenseRequest.Category,
            Description = expenseRequest.Description ?? string.Empty,
            Date = expenseRequest.Date,
        };
        context.Expenses.Add(expense);
        context.SaveChanges();
        return expense;
    }   

    public void Delete(Guid id)
    {
        logger.LogInformation("Deleting expense {}", id);
        Expense expense = Get(id);
        if (expense == null)
        {
            return;
        }

        context.Remove(expense);
        context.SaveChanges();
    }
}