# Sistema de Autenticação Web (Full-Stack)

Projeto desenvolvido para a disciplina de Desenvolvimento Web, composto por um frontend moderno em **Angular** e um backend robusto em **Spring Boot (Kotlin)** com autenticação stateless via **JSON Web Tokens (JWT)**.

---

## Integrantes do Grupo

- **André Pardinho**
- **Cauan Valadão**
- **Enzo Sarmento**
- **Pedro Magalhães**
- **Ronaldo Porto**

---

## Visão Geral do Projeto

A aplicação implementa um fluxo completo de autenticação de usuários, permitindo acesso seguro por meio de tokens JWT. O sistema conta com interface responsiva e intuitiva, com alternância de telas e feedback em tempo real para o usuário, além de proteção e controle de acesso no backend.

### Principais Funcionalidades

- **Autenticação com JWT:**
  - Login integrado à API REST (`POST /auth/login`).
  - Emissão de token JWT assinado criptograficamente (válido por 1 hora).
  - Armazenamento do token no `localStorage` do navegador para requisições subsequentes.
  - Filtro de autenticação (`JwtAuthenticationFilter`) para validação de requisições protegidas via cabeçalho `Authorization: Bearer <token>`.
- **Interface Multi-telas (SPA):**
  - **Login:** Entrada com e-mail e senha, botão de visibilidade de senha (mostrar/ocultar) e mensagens contextuais de erro/sucesso.
  - **Criar Conta:** Formulário com validação de campos obrigatórios e conferência de senha e confirmação de senha.
  - **Esqueci a Senha:** Formulário para inserção do e-mail cadastrado e disparo de instruções de recuperação.
- **Segurança & Boas Práticas:**
  - Senhas criptografadas com `BCryptPasswordEncoder`.
  - Sessão stateless (`SessionCreationPolicy.STATELESS`) sem retenção de estado de sessão no servidor.
  - Suporte a CORS configurado para aceitar requisições de `http://localhost:4200`.

---

## Tecnologias Utilizadas

### Frontend (`tela-login-angular`)
- **[Angular 17](https://angular.io/)** (Standalone Components)
- **TypeScript**
- **HTML5 & CSS3** (Design customizado e responsivo)
- **RxJS** & **HttpClient** (`provideHttpClient`)

### Backend (`tela-login-springboot`)
- **[Kotlin](https://kotlinlang.org/)**
- **[Spring Boot](https://spring.io/projects/spring-boot)** (Web & Security)
- **Spring Security**
- **JJWT (io.jsonwebtoken: 0.11.5)**
- **Gradle** (Kotlin DSL)
- **Java 17**

---

##  Estrutura de Diretórios

```text
atividades-web/
├── tela-login-angular/              # Frontend em Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/               # Componente da tela de login/cadastro/recuperação
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.css
│   │   │   ├── services/            # Serviços de integração HTTP
│   │   │   │   └── auth.service.ts
│   │   │   ├── app.component.ts
│   │   │   └── app.config.ts
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
│
└── tela-login-springboot/           # Backend em Spring Boot (Kotlin)
    ├── src/main/
    │   ├── kotlin/org/example/telaloginspringboot/
    │   │   ├── controller/          # Endpoints REST (AuthController)
    │   │   ├── dto/                 # Data Transfer Objects (LoginRequest, LoginResponse)
    │   │   ├── security/            # Configurações de segurança, filtros e JWT
    │   │   │   ├── JwtService.kt
    │   │   │   ├── JwtAuthenticationFilter.kt
    │   │   │   └── SecurityConfig.kt
    │   │   └── TelaLoginSpringbootApplication.kt
    │   └── resources/
    │       └── application.properties
    ├── build.gradle.kts
    └── gradlew
```

---

##  Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior) e **NPM**
- **Angular CLI** (v17 ou superior)
- **Java JDK 17** ou superior

---

### 1. Executando o Backend (Spring Boot)

1. Navegue até o diretório do backend:
   ```bash
   cd tela-login-springboot
   ```

2. O backend exige a definição da variável de ambiente `JWT_SECRET` contendo uma chave codificada em **Base64** (com pelo menos 256 bits).
   
   Você pode gerar uma chave rápida no terminal:
   ```bash
   openssl rand -base64 32
   ```

3. Exporte a variável e inicie a aplicação:
   ```bash
   # Exemplo no Linux/macOS:
   export JWT_SECRET="S3CR3T_K3Y_E_EXEMPLO_BASE64_GERADA_COM_OPENSSL="
   ./gradlew bootRun
   ```

   > Caso esteja utilizando o Windows PowerShell:
   > ```powershell
   > $env:JWT_SECRET="S3CR3T_K3Y_E_EXEMPLO_BASE64_GERADA_COM_OPENSSL="
   > .\gradlew.bat bootRun
   > ```

4. O servidor iniciará por padrão na porta **`8080`** (`http://localhost:8080`).

---

### 2. Executando o Frontend (Angular)

1. Em outro terminal, navegue até a pasta do frontend:
   ```bash
   cd tela-login-angular
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou: npx ng serve
   ```

4. Abra o navegador em: **`http://localhost:4200`**.

---

## Credenciais Padrão para Testes

O backend está configurado com um usuário em memória pré-cadastrado para autenticação:

| Campo | Valor |
| :--- | :--- |
| **E-mail** | `admin@teste.com` |
| **Senha** | `123456` |

---

## Endpoints da API

### `POST /auth/login`
Autentica o usuário e gera o token de acesso JWT.

- **URL:** `http://localhost:8080/auth/login`
- **Acesso:** Público (`permitAll`)
- **Corpo da Requisição (JSON):**
  ```json
  {
    "email": "admin@teste.com",
    "password": "123456"
  }
  ```
- **Resposta de Sucesso (`200 OK`):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Resposta de Erro (`403 Forbidden` / `401 Unauthorized`):**
  Credenciais inválidas.
