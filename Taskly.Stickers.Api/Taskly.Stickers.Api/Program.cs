using Microsoft.EntityFrameworkCore;
using Taskly.Stickers.Api.Core.Interfaces;
using Taskly.Stickers.Api.Core.Services;
using Taskly.Stickers.Data.DataContexts;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Data.Interfaces;
using Taskly.Stickers.Data.MappingProfilies;
using Taskly.Stickers.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

string? connectionStringStickersDB = builder.Configuration.GetConnectionString("StickersDb");
builder.Services.AddDbContext<StickersContext>(options => options.UseNpgsql(connectionStringStickersDB));


builder.Services.AddScoped<IStickersService, StickersService>();
builder.Services.AddScoped<IBoardsService, BoardsService>();

builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IStickersRepository, StickersRepository>();
builder.Services.AddScoped<IBoardsUsersRepository, BoardsUsersRepository>();
builder.Services.AddScoped<IBoardsStickersRepository, BoardsStickersRepository>();
builder.Services.AddScoped<DbContext, StickersContext>(provider => provider.GetRequiredService<StickersContext>());

builder.Services.AddAutoMapper(typeof(StickerProfile));
builder.Services.AddAutoMapper(typeof(BoardProfile));

builder.Services.AddControllers();

builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("UIPolicy",
        builder => {
            builder.WithOrigins("http://localhost:3000") 
                   .AllowAnyHeader()
                   .AllowAnyOrigin()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("UIPolicy");

app.Run();
