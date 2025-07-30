using FinFunApp.Data;
using FinFunApp.Model;

namespace FinFunApp.Services;

public class IncomesService(ILogger<IncomesService> logger, FinFunDbContext context)
{
    public List<Income> GetAll()
    {
        logger.LogInformation("Fetching all incomes");
        return context.Incomes.ToList();
    }

    public Income Get(Guid id)
    {
        logger.LogInformation("Fetching income {}", id);
        var income = context.Incomes.Find(id);
        
        return income;
    }

    public Income Create(IncomeRequest incomeRequest)
    {
        logger.LogInformation("Creating new income");
        
        var income = new Income()
        {
            Id = Guid.NewGuid(),
            Amount = incomeRequest.Amount,
            Category = incomeRequest.Category,
            Description = incomeRequest.Description ?? string.Empty,
            Date = incomeRequest.Date,
        };
        context.Incomes.Add(income);
        context.SaveChanges();
        return income;
    }   

    public void Delete(Guid id)
    {
        logger.LogInformation("Deleting income {}", id);
        Income income = Get(id);
        if (income == null)
        {
            return;
        }

        context.Incomes.Remove(income);
        context.SaveChanges();
    }
}