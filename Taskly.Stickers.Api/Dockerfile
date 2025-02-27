FROM mcr.microsoft.com/dotnet/aspnet:9.0 as base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 as build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Taskly.Stickers.Api/Taskly.Stickers.Api.csproj", "Taskly.Stickers.Api/"]
COPY ["Taskly.Stickers.Data/Taskly.Stickers.Data.csproj", "Taskly.Data.Api/"]
COPY ["Taskly.Stickers.Models/Taskly.Stickers.Models.csproj", "Taskly.Models.Api/"]
RUN dotnet restore "Taskly.Stickers.Api/Taskly.Stickers.Api.csproj"
COPY . .
WORKDIR "/src/Taskly.Stickers.Api"
RUN dotnet build "Taskly.Stickers.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build as publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Taskly.Stickers.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base as final 
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS="http://+:5244"
COPY  --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "Taskly.Stickers.Api.dll" ]