using FinFunApp.Model;

namespace FinFunApp.DB;

public class ExpensesDbHelper : DBHelper<Expense>
{
    public ExpensesDbHelper(IConfiguration configuration) : base(configuration)
    {
    }
    
    
}