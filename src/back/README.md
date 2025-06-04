## OBSERVAÇÃO!

Caso o backend possua algum erro de "<<<< HEAD" persistindo, basta apagar as pastas de cache (/bin e /obj) e deve ser resolvido.

## Como iniciar o Back-End

1. Abra o terminal e navegue até a pasta do projeto back-end:
   ```
   cd 2025-1-p3-tidai-grupo4-d4/src/back/GamePadAPI/GamePadAPI
   ```
2. Restaure os pacotes NuGet (se necessário):
   ```
   dotnet restore
   ```
3. Inicie a aplicação:
   ```
   dotnet run
   ```
4. O back-end estará disponível normalmente em http://localhost:5069/swagger

> Certifique-se de que o banco de dados esteja configurado corretamente e que as strings de conexão estejam ajustadas conforme seu ambiente.
