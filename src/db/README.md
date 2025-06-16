## Arquivo .sql


```sql
-- Criação da tabela Usuarios
CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(MAX) NOT NULL,
    Email NVARCHAR(MAX) NOT NULL,
    Senha NVARCHAR(MAX) NOT NULL,
    ImgUser NVARCHAR(MAX),
    Tipo NVARCHAR(MAX),
    Bio NVARCHAR(MAX),
    FavoriteGames NVARCHAR(MAX)
);

-- Criação da tabela Avaliacoes
CREATE TABLE Avaliacoes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nota NVARCHAR(MAX) NOT NULL,
    Comentario NVARCHAR(MAX) NOT NULL,
    Data DATETIME2 NOT NULL,
    UsuarioId INT NOT NULL,
    IgdbGameId BIGINT,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

-- Criação da tabela Consoles
CREATE TABLE Consoles (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(MAX) NOT NULL,
    Plataforma NVARCHAR(MAX) NOT NULL
);

-- Criação da tabela Posts
CREATE TABLE Posts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(MAX),
    Descricao NVARCHAR(MAX) NOT NULL,
    Link NVARCHAR(MAX),
    Data DATETIME2 NOT NULL,
    UsuarioId INT NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

-- Criação da tabela Sugestoes
CREATE TABLE Sugestoes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(MAX) NOT NULL,
    Descricao NVARCHAR(MAX) NOT NULL,
    Data DATETIME2 NOT NULL,
    UsuarioId INT NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

-- Criação da tabela UserGameStatuses
CREATE TABLE UserGameStatuses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT NOT NULL,
    IgdbGameId BIGINT NOT NULL,
    Status INT NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);
