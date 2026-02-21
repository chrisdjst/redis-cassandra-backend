# redis-cassandra-backend

API REST construída com **NestJS** e **TypeScript** para gerenciamento acadêmico, utilizando **Apache Cassandra** como banco de dados principal e **Redis** para caching. Projeto desenvolvido em equipe como trabalho acadêmico, com CI/CD e deploy em produção.

## Sobre o projeto

Sistema de gestão acadêmica com autenticação JWT, cobrindo as entidades de cursos, matérias, usuários, matrículas, professores e registros de aula. O backend foi projetado para explorar bancos de dados distribuídos em um contexto real de aplicação.

## Funcionalidades

- Autenticação com JWT + Passport (estratégias local e JWT)
- CRUD completo de **Cursos**, **Matérias**, **Usuários**, **Matrículas** e **Registro de Aulas**
- Módulo `Leciona` para relacionamento entre professores e matérias
- Validação global de requests com `class-validator` e `class-transformer`
- Caching com **Redis** (RedisLabs Cloud)
- Persistência com **Apache Cassandra** (Datastax Astra DB)
- Guard JWT global — todas as rotas são protegidas por padrão

## Stack

- [NestJS 8](https://nestjs.com/) + TypeScript
- [Apache Cassandra](https://cassandra.apache.org/) via Datastax Astra DB (`cassandra-driver`)
- [Redis](https://redis.io/) via RedisLabs Cloud (`ioredis`, `redis-om`)
- JWT + Passport (`@nestjs/jwt`, `passport-jwt`, `passport-local`)
- [CircleCI](https://circleci.com/) para CI/CD
- Deploy no [Heroku](https://heroku.com/)

## Estrutura de módulos

```
src/
├── auth/           # Autenticação JWT + Passport
├── common/
│   ├── cassandra/  # Módulo de conexão com Cassandra
│   └── redis/      # Módulo de conexão com Redis
├── usuario/        # Gestão de usuários
├── curso/          # Gestão de cursos
├── materia/        # Gestão de matérias
├── matricula/      # Matrículas de alunos em cursos
├── leciona/        # Relacionamento professor ↔ matéria
└── registro_aula/  # Registro de presença em aulas
```

## Como rodar localmente

### Pré-requisitos

- Node.js 16+
- Conta no [Datastax Astra DB](https://astra.datastax.com/) (Cassandra gerenciado)
- Conta no [RedisLabs](https://redis.com/) (Redis gerenciado)

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Preencha JWT_SECRET e as credenciais do Cassandra/Redis no .env
```

### Executando

```bash
# Desenvolvimento (hot reload)
npm run start:dev

# Produção
npm run start:prod
```

### Testes

```bash
npm run test        # Testes unitários
npm run test:e2e    # Testes end-to-end
npm run test:cov    # Cobertura de testes
```

## Projeto relacionado

**[redis-cassandra-frontend](https://github.com/chrisdjst/redis-cassandra-frontend)** — Interface Vue.js + Vuetify que consome esta API.

## Contribuidores

Desenvolvido em equipe como projeto acadêmico.
