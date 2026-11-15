<p align="right"><sub>DEVELOPER LAB &nbsp;·&nbsp; BACKEND / GEO / DATA</sub></p>

<h1>João Vitor</h1>
<p><strong>Software Developer | .NET &amp; Backend</strong><br />
<sub>Backend .NET/C# · desenvolvimento Full Stack · WebGIS</sub></p>

<p>Antes do código, procuro entender o caminho do dado e as regras que o sistema precisa respeitar.</p>

<p><img src="assets/developer-lab-hero.jpg" alt="Ilustração original de um ambiente de desenvolvimento noturno com terminais, mapa geoespacial e diagrama de arquitetura abstrato" width="100%" /></p>

<div align="right">
<pre><code>joao@developer-lab:~$ profile
focus      .NET / C# · backend
field      APIs · data · geospatial
approach   understand → model → build</code></pre>
</div>

<p align="center">
  <a href="#projetos-em-destaque">PROJETOS</a> &nbsp;·&nbsp;
  <a href="#engenharia">ENGENHARIA</a> &nbsp;·&nbsp;
  <a href="#experiencia">EXPERIÊNCIA</a> &nbsp;·&nbsp;
  <a href="#toolbox">TOOLBOX</a> &nbsp;·&nbsp;
  <a href="#contato">CONTATO</a>
</p>

## Projetos em destaque

<p>Projetos profissionais, acadêmicos e autorais aparecem separados. Uso capturas reais quando disponíveis; a ilustração do SIGA-Rotas é conceitual e não representa a interface do sistema.</p>

<table>
  <tbody>
    <tr>
      <td width="170" align="center" valign="middle">
        <img src="assets/route-concept.svg" alt="Ilustração conceitual de uma rota sobre uma malha geográfica; não é captura de tela do SIGA-Rotas" width="160" />
        <p><sub>Ilustração conceitual · sem captura pública</sub></p>
      </td>
      <td valign="top">
        <p><strong>SIGA-Rotas</strong> · Experiência profissional · Prefeitura de Santo André</p>
        <p><strong>Contexto:</strong> aplicação para planejamento e acompanhamento de rotas, com geolocalização e otimização, conforme o resumo fornecido.</p>
        <p><strong>Stack e repositório:</strong> não há repositório público disponível para verificar tecnologias ou mostrar uma captura real; por isso, não atribuo uma stack específica nem exponho detalhes de implementação.</p>
      </td>
    </tr>
    <tr>
      <td width="170" align="center" valign="middle">
        <a href="https://github.com/jvitorsi-dev/PetClean">
          <img src="https://raw.githubusercontent.com/jvitorsi-dev/PetClean/88dc1437edaf0794e9863b56764a1ce430bb12d1/docs/apresentacao/assets/dash-popy.png" alt="Captura real do dashboard do PetClean" width="160" />
        </a>
      </td>
      <td valign="top">
        <p><strong><a href="https://github.com/jvitorsi-dev/PetClean">PetClean</a></strong> · Projeto acadêmico</p>
        <p><strong>Problema:</strong> reunir rotinas de gestão de um pet shop — clientes, pets, agendamentos, estoque e dashboards.</p>
        <p><strong>Implementação:</strong> API REST e painel web com autenticação por sessão, regras de negócio e testes.</p>
        <p><code>Java</code> <code>Spring Boot</code> <code>Spring Data JPA</code> <code>H2</code> <code>Thymeleaf</code> <code>JUnit</code></p>
      </td>
    </tr>
    <tr>
      <td width="170" align="center" valign="middle">
        <a href="https://github.com/jvitorsi-dev/vozes-do-oceano">
          <img src="https://raw.githubusercontent.com/jvitorsi-dev/vozes-do-oceano/09616dc4f7f18e2cf55e228caf615b75dadbc1c9/docs/capturas/06-oceano-de-irio.png" alt="Captura real do oceano de Írio em Vozes do Oceano" width="160" />
        </a>
      </td>
      <td valign="top">
        <p><strong><a href="https://github.com/jvitorsi-dev/vozes-do-oceano">Vozes do Oceano</a></strong> · Projeto autoral experimental, em desenvolvimento</p>
        <p><strong>Proposta:</strong> exploração e investigação narrativa em primeira pessoa, com decisões que influenciam os acontecimentos.</p>
        <p><strong>Implementação:</strong> sistemas de estado, anomalias contextuais e construção procedural de cenário e atmosfera.</p>
        <p><code>Godot 4.4</code> <code>GDScript</code> <code>Shaders</code></p>
      </td>
    </tr>
  </tbody>
</table>

## Engenharia

<p>Os diagramas abaixo são modelos conceituais para ilustrar áreas que estudo e tecnologias que aparecem no meu trabalho. Não descrevem a arquitetura de sistemas municipais nem a implementação interna do SIGA-Rotas.</p>

### Backend e persistência

```mermaid
flowchart LR
    UI["Interface web"] -->|HTTP / REST| API["API · .NET / C#"]
    API --> APP["Aplicação · casos de uso e regras"]
    APP --> PORTS["Contratos / repositórios"]
    PORTS --> DB[("SQL Server / Oracle")]
    APP --> EXT["Integrações externas"]

    classDef core fill:#101916,stroke:#35c88a,color:#e9fff5,stroke-width:1.5px
    classDef data fill:#101820,stroke:#53c9d7,color:#eefbff,stroke-width:1.5px
    class UI,API,APP,PORTS,EXT core
    class DB data
```

### Fluxo geoespacial conceitual

```mermaid
flowchart LR
    SOURCE["Dados espaciais / coordenadas"] --> SERVICE["Serviço geoespacial"]
    SERVICE --> GEOSERVER["GeoServer"]
    GEOSERVER --> MAP["OpenLayers / Cesium"]
    MAP --> DASH["ECharts / visualização"]

    classDef source fill:#101916,stroke:#35c88a,color:#e9fff5,stroke-width:1.5px
    classDef service fill:#101820,stroke:#53c9d7,color:#eefbff,stroke-width:1.5px
    class SOURCE,MAP,DASH source
    class SERVICE,GEOSERVER service
```

## Experiência

### Secretaria de Tecnologia e Inovação · Prefeitura de Santo André

Desenvolvimento e manutenção de sistemas utilizados em contexto municipal, incluindo participação em projetos de geoprocessamento, WebGIS e dashboards geográficos. A experiência também envolve integração de serviços geoespaciais, manipulação de dados espaciais, bancos relacionais e resolução de problemas em sistemas legados.

Os detalhes publicados aqui ficam intencionalmente em alto nível: não compartilho código, dados ou informações internas de infraestrutura.

## Toolbox

<p><strong>⌘ Foco principal</strong><br />
<code>C#</code> <code>.NET</code> <code>.NET Framework</code> <code>APIs REST</code> <code>SQL Server</code></p>

<p><strong>▤ Dados, web e integração</strong><br />
<code>Oracle</code> <code>PL/SQL</code> <code>JavaScript</code> <code>HTML</code> <code>CSS</code> <code>Git</code> <code>GitHub</code></p>

<p><strong>⌖ Geoespacial e visualização</strong><br />
<code>OpenLayers</code> <code>GeoServer</code> <code>Cesium</code> <code>ECharts</code></p>

<p><sub>As tecnologias estão agrupadas por contexto de atuação e projeto — não como uma escala uniforme de domínio.</sub></p>

## Interesses

Arquitetura de software, engenharia de backend, APIs, integração entre serviços, sistemas escaláveis e problemas em que regras de negócio e qualidade dos dados importam. Quero continuar aprofundando essas áreas sem perder de vista a operação e a manutenção das soluções.

## Formação

Estudante de **Análise e Desenvolvimento de Sistemas na FATEC**.

## Contato

- **GitHub:** [jvitorsi-dev](https://github.com/jvitorsi-dev)
- **LinkedIn:** [João Vitor Silva](https://www.linkedin.com/in/joao-vitor-silva-85a1a3390)
- **Email:** [jvitorsi.dev@gmail.com](mailto:jvitorsi.dev@gmail.com)
