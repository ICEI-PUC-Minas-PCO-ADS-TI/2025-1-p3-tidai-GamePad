# Game Pad

<br><img src="./docs/images/gamepadHeader.png" width="200px">

<br> 

`CURSO: Análise e Desenvolvimento de Sistemas`

`DISCIPLINA: Trabalho Interdisciplinar Desenvolvimento de Aplicação Interativa`

`3º semestre/2025`

Nosso projeto visa a criação de uma plataforma voltada para lazer e entretenimento, onde os usuários podem avaliar e compartilhar suas opiniões sobre jogos. Através de notas e comentários, a plataforma facilita a descoberta de jogos bem avaliados, ajudando os usuários a tomarem decisões mais rápidas e assertivas sobre o que jogar, economizando tempo na busca por títulos de qualidade. Nosso objetivo é criar um espaço interativo e colaborativo, onde a troca de experiências enriquece a comunidade e melhora a experiência de entretenimento de todos.

## Integrantes

* Alex Mendes dos Santos
* Andry Marques Pereira da Silveira
* Isaac Souza Fernandes
* Pablo Marques Cordeiro
* Ramon Pereira de Souza
* Yalle Ramos Ferrari de Magalhaes

## Professor

* Kleber Jacques Ferreira de Souza

## Instruções de utilização

Para executar o projeto GamePad localmente, siga os passos abaixo:

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd 2025-1-p3-tidai-GamePad
```

### 2. Instale as dependências do backend

```bash
cd src/back/GamePadAPI/GamePadAPI
dotnet restore
```

### 3. Crie o banco de dados

Certifique-se de que o SQL Server está rodando e a string de conexão está correta em appsettings.json.
Depois, execute:

```bash
dotnet ef database update
```

### 4. Inicie o backend

```bash
dotnet run
```
### 5. Instale as dependências do frontend

Abra um novo terminal e execute:

```bash
cd src/front
npm install
```
### 6. Inicie o frontend

```bash
npm run dev
```
### 7. Acesse a aplicação

Abra o navegador e acesse: http://localhost:5173

<!--Assim que a primeira versão do sistema estiver disponível, deverá complementar com as instruções de utilização. Descreva como instalar eventuais dependências e como executar a aplicação.

Não deixe de informar o link onde a aplicação estará disponível para acesso (por exemplo: https://adota-pet.herokuapp.com/src/index.html).

Se houver usuário de teste, o login e a senha também deverão ser informados aqui (por exemplo: usuário - admin / senha - admin).

O link e o usuário/senha descritos acima são apenas exemplos de como tais informações deverão ser apresentadas.-->

# Documentação

<ol>
<li><a href="docs/01-Contexto.md"> Documentação de contexto</a></li>
<li><a href="docs/02-Especificacao.md"> Especificação do projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Projeto-interface.md"> Projeto de interface</a></li>
<li><a href="docs/05-Template-padrao.md"> Template padrão da aplicação</a></li>
<li><a href="docs/06-Arquitetura-solucao.md"> Arquitetura da solução</a></li>
<li><a href="docs/07-Plano-testes-software.md"> Plano de testes de software</a></li>
<li><a href="docs/08-Registro-testes-software.md"> Registro de testes de software</a></li>
<li><a href="docs/09-Plano-testes-usabilidade.md"> Plano de testes de usabilidade</a></li>
<li><a href="docs/10-Registro-testes-usabilidade.md"> Registro de testes de usabilidade</a></li>
<li><a href="docs/11-Referencias.md"> Referências</a></li>
</ol>

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>
