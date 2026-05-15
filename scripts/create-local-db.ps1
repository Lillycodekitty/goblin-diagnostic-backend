# Create a local PostgreSQL database for Goblin Diagnostic Backend
# Run this after PostgreSQL is installed and psql is available in PATH.

$databaseName = 'goblin_db'
$userName = 'postgres'
$password = 'postgres'

Write-Host "Creating database: $databaseName"
& psql -U $userName -c "CREATE DATABASE $databaseName;"

Write-Host "Database created."
Write-Host "If you want a dedicated user, run these commands manually:"
Write-Host "  CREATE USER goblin_user WITH PASSWORD 'goblin_dev';"
Write-Host "  GRANT ALL PRIVILEGES ON DATABASE $databaseName TO goblin_user;"
