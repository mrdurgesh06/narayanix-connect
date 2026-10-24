# NARAYANIX Connect API (ASP.NET Core 8) for Render.
# Build context = repository root (Render's default), so no "Root Directory" setting is needed.

# ---------- build ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Restore first (cached unless the .csproj changes)
COPY server/NarayanixConnect.Api/NarayanixConnect.Api.csproj server/NarayanixConnect.Api/
RUN dotnet restore server/NarayanixConnect.Api/NarayanixConnect.Api.csproj

COPY server/NarayanixConnect.Api/ server/NarayanixConnect.Api/
RUN dotnet publish server/NarayanixConnect.Api/NarayanixConnect.Api.csproj \
    -c Release -o /app/publish --no-restore

# ---------- run ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Folder for uploaded logo/favicon. NOTE: on a Free Render web service the disk is ephemeral
# (files vanish on redeploy / restart / spin-down) - see docs/DEPLOY_RENDER.md.
RUN mkdir -p /app/uploads && chown -R ${APP_UID:-1654} /app/uploads

ENV ASPNETCORE_ENVIRONMENT=Production
USER ${APP_UID:-1654}

# Render provides PORT (default 10000) and requires listening on 0.0.0.0.
# TLS ends at Render's edge, so the app speaks plain HTTP here.
EXPOSE 10000
CMD ["sh", "-c", "ASPNETCORE_URLS=http://0.0.0.0:${PORT:-10000} exec dotnet NarayanixConnect.Api.dll"]
