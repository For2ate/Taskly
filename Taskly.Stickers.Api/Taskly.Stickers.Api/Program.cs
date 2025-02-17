using Microsoft.EntityFrameworkCore;
using Taskly.Stickers.Data.DataContexts;

var builder = WebApplication.CreateBuilder(args);

string? connectionStringStickersDB = builder.Configuration.GetConnectionString("StickersDb");
builder.Services.AddDbContext<StickersContext>(options => options.UseNpgsql(connectionStringStickersDB));

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
