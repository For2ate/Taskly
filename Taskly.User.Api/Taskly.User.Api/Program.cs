using Microsoft.EntityFrameworkCore;
using Taskly.User.Data.DataContexts;
using Taskly.User.Data.MappingProfilies;
using FluentValidation;
using Taskly.User.Api.Core.Validations;
using FluentValidation.AspNetCore;
using Taskly.User.Api.Core.Interfaces;
using Taskly.User.Api.Core.Services;
using Taskly.User.Data.Interfaces;
using Taskly.User.Data.Repositories;


var builder = WebApplication.CreateBuilder(args);

//���������� ����������� ��
string? connectionStringUserDB = builder.Configuration.GetConnectionString("UserDB");
builder.Services.AddDbContext<UserContext>(options => options.UseNpgsql(connectionStringUserDB));

//���������� ������������ �����������
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<UserRegistrationValidator>();

//���������� ������������ �������� ��������
builder.Services.AddAutoMapper(typeof(UserProfile));

//���������� ������������ ��������
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();

//���������� ������������ ������������
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("MyPolicy",
        builder => {
            builder.WithOrigins("http://localhost:3000") 
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("MyPolicy");

app.MapControllers();

app.Run();
