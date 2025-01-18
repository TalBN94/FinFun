using FinFunApp.Errors;
using FinFunApp.Exceptions;
using FinFunApp.Filters;
using FinFunApp.Services;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.Filters.Add<LoggingFilter>();
});
builder.Services.AddExceptionHandler<AppExceptionHandler>();
builder.Services.AddTransient<ExpensesService>();
builder.Services.AddScoped<LoggingFilter>();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = ModelValidationErrorResponse.GenerateResponse;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://finfunclient")// Replace with your React app URL
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseExceptionHandler( _ => { });
app.UseCors("AllowReactApp");
app.UseRouting();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();