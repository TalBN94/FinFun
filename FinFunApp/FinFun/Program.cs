using FinFunApp.Errors;
using FinFunApp.Exceptions;
using FinFunApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddExceptionHandler<AppExceptionHandler>();
builder.Services.AddTransient<ExpensesService>();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = ModelValidationErrorResponse.GenerateResponse;
});

if (builder.Environment.IsDevelopment())
{
    Console.WriteLine("Running on development");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://finfunclient")// Replace with your React app URL
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Configuration.AddJsonFile("appsettings.Development.json", false, true);
string connectionString = builder.Configuration.GetConnectionString("Postgres");

builder.Services.AddDbContext<FinFunDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();
app.UseExceptionHandler( _ => { });
app.UseCors("AllowReactApp");
app.UseRouting();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();