using Microsoft.EntityFrameworkCore;
using FinFunApp.Model;

public class FinFunDbContext : DbContext
{
    public DbSet<Expense> Expenses { get; set; }

    public FinFunDbContext(DbContextOptions<FinFunDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Expense>().ToTable("expense");

        // Optional: use this only if you want manual control over column names
        // You can skip if you're using EFCore.NamingConventions
    }
}