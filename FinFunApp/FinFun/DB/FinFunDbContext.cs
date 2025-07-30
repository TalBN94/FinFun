using Microsoft.EntityFrameworkCore;
using FinFunApp.Model;

public class FinFunDbContext : DbContext
{
    public virtual DbSet<Expense> Expenses { get; set; }
    public virtual DbSet<Income> Incomes { get; set; }

    public FinFunDbContext(DbContextOptions<FinFunDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Expense>().ToTable("expense");
        modelBuilder.Entity<Income>().ToTable("income");

        // Optional: use this only if you want manual control over column names
        // You can skip if you're using EFCore.NamingConventions
    }
}