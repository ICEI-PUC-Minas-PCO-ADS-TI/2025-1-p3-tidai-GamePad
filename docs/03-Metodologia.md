
# Metodologia

Para garantir um fluxo de trabalho eficiente e ágil, o desenvolvimento do Game Pede seguirá uma abordagem híbrida baseada no Scrum e Kanban.

Scrum: Será utilizado para estruturar o desenvolvimento em ciclos iterativos e incrementais, denominados sprints. Cada sprint terá duração de duas semanas e contará com reuniões de planejamento, acompanhamento diário (daily scrum), revisão e retrospectiva.

Kanban: Será aplicado para proporcionar um fluxo contínuo de trabalho, utilizando um quadro visual no GitHub Projects para acompanhar o progresso das tarefas e priorizar atividades de forma dinâmica.

Essa metodologia combinada permitirá maior flexibilidade na adaptação a mudanças, enquanto mantém um acompanhamento eficiente das entregas do projeto.

## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos e gerenciados em diferentes plataformas. A tabela abaixo apresenta os ambientes utilizados, suas respectivas plataformas e links de acesso:

| Ambiente               | Plataforma/Ferramenta | Link de Acesso |
|------------------------|----------------------|---------------|
| Repositório de Código | GitHub               | [Link do Repositório](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p3-tidai-grupo4-d4) |
| Documentação          | GitHub | [Link da Documentação](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p3-tidai-grupo4-d4/blob/main/docs/01-Contexto.md) |
| Gerenciamento de Tarefas | GitHub Projects     | [Link do Kanban](https://github.com/orgs/ICEI-PUC-Minas-PCO-ADS-TI/projects/31) |
| Prototipação de UI    | Figma                | [Link do Figma](https://www.figma.com/design/tKjdo8AeLVv0W64nULEtwd/G4?m=auto&t=yGZu7frZzkrPTH5k-1) |
| Hospedage    | Vercel                | [Link do Vercel](#) |

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida


## Planejamento do projeto

###  Divisão de papéis


#### Sprint 1
- _Scrum master_: Andry Marques
- Documentação: Alex Mendes, Pablo Marques, Andry Marques, Ramon Pereira e Yalle Ramos

###  Quadro de tarefas


#### Sprint 1

Atualizado em: 19/03/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Pablo Marques      | Contexto | 12/02/2025     | 12/03/2025 | ✔️    | 17/02/2025      |
| Pablo Marques      | Especificacao | 12/02/2025     | 12/03/2025 | ✔️    | 17/02/2025      |
| Andry Marques      | Especificacao | 06/03/2025     | 12/03/2025 | ✔️    | 10/03/2025      |
| Yalle Ramos      | Metodologia | 06/03/2025     | 12/03/2025 | ✔️    | 19/03/2025      |
| Alex Mendes      | Apresentação | 12/03/2025     | 12/03/2025 | ✔️    | 12/03/2025      |
 

###  Divisão de papéis

#### Sprint 2
- _Scrum master_: Andry Marques
- Protótipos: Pablo Marques Cordeiro
- Documentação: Alex Mendes, Pablo Marques, Andry Marques, Ramon Pereira e Yalle Ramos

- Front-end: Alex Mendes, Pablo Marques, Andry Marques, Ramon Pereira e Yalle Ramos

- Back-end: Alex Mendes, Pablo Marques, Andry Marques, Ramon Pereira e Yalle Ramos

- Banco de dados: Alex Mendes, Pablo Marques, Andry Marques, Ramon Pereira e Yalle Ramos

Apesar de todos serem responsáveis pelo seu próprio CRUD, teremos pessoas com mais experiência em algumas tecnologias que ficarão responsáveis pela revisão de algumas áreas.
- Front-end: Pablo Marques
- Banco de dados: Yalle Ramos

###  Quadro de tarefas


#### Sprint 2

Atualizado em: 09/04/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Alex Mendes         |    Wireframe de Regras e Feed         |    02/04/2025      | 09/04/2025     | ✔️ | 06/04/2025          |
| Alex Mendes         |    Template padrão (imagem)         |    07/04/2025      | 09/04/2025     | ✔️ | 07/04/2025          |
| Ramon Pereira        |    Tela de Avaliação e Comentários         |    07/04/2025      | 09/04/2025     | ✔️ | 07/04/2025          |
| Yalle Ramos        |    Tela de Notícias         |    07/04/2025      | 09/04/2025     | ✔️ | 07/04/2025          |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

### Processo

O desenvolvimento será conduzido utilizando **Scrum**, e as tarefas serão gerenciadas através do **GitHub Projects**. A estrutura do processo será:

1. **Sprints de 2 semanas** – Cada sprint terá um backlog definido e entregáveis específicos;
2. **Sprint Review** – Revisão do que foi desenvolvido e demonstração de funcionalidades;
3. **Sprint Retrospective** – Avaliação do sprint, identificação de melhorias e ajustes no processo;
4. **Kanban no GitHub Projects** – Utilizado para controle de fluxo das tarefas e visibilidade do progresso.

Essa abordagem garantirá um acompanhamento claro das atividades e possibilitará ajustes rápidos conforme necessário para atender às demandas do projeto.

## Tecnologias Utilizadas 

### Front-end
![badge-react]
![badge-axios]
![badge-vite]

### Back-end
![badge-nodejs]
![badge-sql]

### Deploy
![badge-azure]
![badge-vercel]

### Ferramentas




| Ambiente               | Plataforma/Ferramenta | Link de Acesso |
|------------------------|----------------------|---------------|
| Repositório de Código | GitHub               | [Link do Repositório](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p3-tidai-grupo4-d4) |
| Documentação          | GitHub | [Link da Documentação](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p3-tidai-grupo4-d4/blob/main/docs/01-Contexto.md) |
| Gerenciamento de Tarefas | GitHub Projects     | [Link do Kanban](https://github.com/orgs/ICEI-PUC-Minas-PCO-ADS-TI/projects/31) |
| Prototipação de UI    | Figma                | [Link do Figma](https://www.figma.com/design/tKjdo8AeLVv0W64nULEtwd/G4?m=auto&t=yGZu7frZzkrPTH5k-1) |
| Hospedage    | Vercel                | [Link do Vercel](#) |
 
<!--badges-->

[badge-react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[badge-azure]: https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white

[badge-nodejs]: https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white

[badge-vite]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E

[badge-axios]: https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white

[badge-vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white

[badge-sql]: https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white
