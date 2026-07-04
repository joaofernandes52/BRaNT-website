# BRaNT Website

Website institucional do grupo de investigação **BRaNT** (Brain Research and Neurotechnology), desenvolvido durante um **estágio de verão** e posteriormente melhorado com foco em segurança, qualidade de código e boas práticas de desenvolvimento.

## Sobre o Projeto

O BRaNT é um grupo de investigação na área de neurociência e neurotecnologia. Este website foi construído para gerir e apresentar publicamente o trabalho do grupo: membros, publicações, atividades e conteúdos multimédia.

A primeira versão foi desenvolvida como projeto de estágio de verão. Após o estágio, o projeto passou por uma auditoria completa e foram corrigidos 28 findings — de vulnerabilidades críticas de segurança a melhorias de qualidade de código.

## Stack

- **Backend:** Node.js · Express 4
- **Base de dados:** MongoDB (Mongoose 6)
- **Templates:** EJS
- **Autenticação:** Passport.js (Local Strategy)
- **Frontend:** Bootstrap 4 · Bootstrap Icons
- **Upload de ficheiros:** Multer

## Funcionalidades

**Área pública**
- Página de apresentação do grupo (missão, objetivos, organização)
- Listagem e detalhe de membros da equipa com foto de perfil
- Publicações científicas com pesquisa e detalhe
- Atividades e eventos
- Conteúdos multimédia (links para vídeos externos)

**Área de administração** (autenticação obrigatória)
- Adicionar, editar e remover membros, publicações, atividades e multimédia
- Editar os conteúdos da página principal

## Melhorias Pós-Estágio

Após o estágio foi feita uma auditoria completa ao código. Principais melhorias aplicadas:

| Área | Melhoria |
|---|---|
| Segurança | Credenciais movidas para variáveis de ambiente (`.env`) |
| Segurança | Passwords com hash bcrypt (antes guardadas em texto simples) |
| Segurança | Proteção CSRF em todos os formulários |
| Segurança | Validação de tipo e tamanho nos uploads de ficheiros |
| Segurança | Mass assignment corrigido em todos os endpoints |
| Backend | Callbacks convertidos para `async/await` em todas as rotas |
| Backend | Middleware global elimina queries duplicadas em 15+ rotas |
| Backend | `findByIdAndRemove` substituído por `findByIdAndDelete` |
| Código | `var` substituído por `const`/`let` em todo o código |
| Código | Typos nos schemas corrigidos (`tittle` → `title`, `adress` → `address`) |
| Frontend | Título da página de login era "SpaceX" (artifact de tutorial) |
| Frontend | Imagens placeholder externas substituídas por assets locais |
| Frontend | Font Awesome substituído por Bootstrap Icons (já incluído) |

## Instalação e Setup

### Pré-requisitos

- Node.js >= 14
- MongoDB Atlas (ou instância local)

### 1. Clonar e instalar dependências

```bash
git clone https://github.com/joaofernandes52/BRaNT-website.git
cd BRaNT-website
npm install
```

### 2. Configurar variáveis de ambiente

Copia o ficheiro de exemplo e preenche com os teus valores:

```bash
cp .env.example .env
```

Edita o `.env`:

```
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/?retryWrites=true&w=majority
SESSION_SECRET=uma_string_aleatoria_longa_de_pelo_menos_64_caracteres
PORT=8080
```

### 3. Criar a pasta de uploads

```bash
mkdir uploads
```

### 4. Migrar dados existentes (apenas na primeira vez)

Se estiveres a migrar de uma versão anterior do projeto com dados na base de dados:

```bash
node scripts/hash-admin-password.js   # faz hash das passwords existentes
node scripts/migrate-typos.js          # corrige nomes de campos na MongoDB
```

### 5. Arrancar o servidor

```bash
npm start
# ou para desenvolvimento com reload automático:
npx nodemon server.js
```

O servidor fica disponível em `http://localhost:8080`.

## Estrutura do Projeto

```
BRaNT-website/
├── REST/
│   ├── rest.js          # Rotas públicas (GET)
│   └── dashboard.js     # Rotas de administração (CRUD)
├── model/
│   └── model.js         # Schemas Mongoose e ligação à BD
├── public/
│   ├── images/
│   └── stylesheets/
├── scripts/
│   ├── hash-admin-password.js   # Migração de passwords
│   └── migrate-typos.js         # Migração de campos da BD
├── views/
│   ├── partials/        # Header e footer partilhados
│   └── *.ejs            # Templates das páginas
├── uploads/             # Ficheiros carregados (gitignored)
├── server.js            # Entry point da aplicação
├── .env.example         # Template de configuração
└── package.json
```

## Contexto

Este projeto foi desenvolvido durante um **estágio de verão** como projeto real para o grupo de investigação BRaNT. Após o estágio, o projeto foi revisto e melhorado de forma independente como exercício de aprendizagem, aplicando boas práticas de segurança e desenvolvimento web que não tinham sido implementadas na versão original.
