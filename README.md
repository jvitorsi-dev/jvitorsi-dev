<p align="right"><sub>JV.DEV &nbsp;·&nbsp; PROFILE / README.md</sub></p>

# João Vitor

**Software Developer · Backend .NET/C# &amp; Full Stack**<br />
<sub>Análise e Desenvolvimento de Sistemas · FATEC · Santo André, SP</sub>

Gosto de entender o fluxo e as regras de um sistema antes de escolher a abstração. Meu foco é backend, com interesse em produtos full-stack, dados e integração.

<!-- Bloco de terminal apenas visual: README não executa comandos nem JavaScript. -->
```bash
joao@jv.dev:~$ whoami
João Vitor · Software Developer
joao@jv.dev:~$ focus
Backend .NET/C# · Full Stack
joao@jv.dev:~$ context
APIs · WebGIS · engenharia de software
```

<p align="center"><a href="https://jvitorsi-dev.github.io/jvitorsi-dev/"><strong>ABRIR JV.DEV — WORKSPACE INTERATIVO ↗</strong></a></p>

## `projects/` · em destaque

### `TaskFlow` — engenharia backend

API REST para gerenciamento de projetos, tarefas e usuários em **ASP.NET Core / .NET 10**. As camadas Domain, Application, Infrastructure, API e Tests seguem uma arquitetura inspirada em Clean Architecture; a persistência usa **EF Core e SQL Server**. Um Worker processa eventos de conclusão via **MassTransit Outbox e RabbitMQ**. Testes xUnit cobrem camadas do sistema.

<sub>O branch público `master` contém a API e o Worker; não encontrei código Angular ou captura de interface, então não apresento um frontend como entregue.</sub> · [Repositório ↗](https://github.com/jvitorsi-dev/TaskFlow)

### `Easy Delivery` — produto full-stack

<p><img align="right" src="assets/easydelivery-logo.png" alt="Logomarca do Easy Delivery; não é uma captura da aplicação" width="145" /></p>

Fluxo de pedidos para restaurantes com **API ASP.NET Core / .NET 10** e **frontend Angular 21**. O código cobre navegação de restaurantes e cardápios, carrinho, operação de pedidos pelo restaurante e aceite/conclusão de entregas. O backend cria preferências e recebe notificações de pagamento do **Mercado Pago**, com autenticação JWT e persistência EF Core / SQL Server.

<sub>A imagem é a logomarca publicada no repositório, não uma captura do produto. O workflow de CD atual simula o deploy; não encontrei uma demo hospedada.</sub> · [Repositório ↗](https://github.com/jvitorsi-dev/EasyDelivery)

### `LexIA` — experimentação com RAG

Assistente backend para pesquisa em legislação municipal. O pipeline extrai texto de PDF com **PdfPig**, divide o conteúdo por artigo, gera embeddings e recupera trechos por similaridade; uma barreira de relevância evita chamar o modelo quando a base não oferece suporte suficiente. O prompt orienta a responder com referências à lei e ao artigo recuperados.

API Minimal e CLI; armazenamento local JSON ou **PostgreSQL / pgvector**. A configuração padrão usa Gemini por um adaptador compatível com a API OpenAI. Interface Angular, streaming, busca híbrida, avaliações e deploy aparecem no README do projeto como próximos passos — não como funcionalidades concluídas. Não há captura pública. · [Repositório ↗](https://github.com/jvitorsi-dev/lexia)

## Stack · por contexto

- **Backend:** C#, .NET, ASP.NET Core, .NET Framework, APIs REST, Entity Framework Core
- **Frontend:** Angular, TypeScript, JavaScript, HTML, CSS
- **Database:** SQL Server, Oracle, PL/SQL, PostgreSQL, pgvector
- **Geospatial:** OpenLayers, GeoServer, Cesium, ECharts
- **Tools:** Git, GitHub, Swagger / OpenAPI, xUnit, Moq

Tecnologias agrupadas por contexto de uso; sem níveis artificiais de proficiência.

## Experiência

**Secretaria de Tecnologia e Inovação · Prefeitura de Santo André** — desenvolvimento e manutenção de sistemas municipais, com atuação em geoprocessamento, WebGIS, dashboards geográficos, integração de serviços, bancos de dados e sistemas legados. A descrição permanece em alto nível e não expõe informações internas.

## Contato

[GitHub](https://github.com/jvitorsi-dev) · [LinkedIn](https://www.linkedin.com/in/joao-vitor-silva-85a1a3390) · [jvitorsi.dev@gmail.com](mailto:jvitorsi.dev@gmail.com)
