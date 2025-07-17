# Plano de Arquitetura e Tecnologias para a Ferramenta 'Ajuste de Multiplicador'

## 1. Visão Geral da Arquitetura
A ferramenta 'Ajuste de Multiplicador' será desenvolvida como uma aplicação web full-stack, composta por um frontend (Next.js) e um backend (NestJS), que se comunicarão com um banco de dados MySQL. A autenticação será integrada com o sistema de intranet existente.

## 2. Componentes da Arquitetura

### 2.1. Frontend (Next.js)
- **Tecnologia:** Next.js (React Framework)
- **Funcionalidades:**
  - Interface de usuário para consulta e inclusão de pedidos de ajuste de multiplicador.
  - Telas específicas para inclusão (`/inclusao`), consulta (`/consultar`) e administração (`/administrar`).
  - Exibição de dados do usuário logado (matrícula e nome).
  - Validação de formulários e regras de negócio (ex: campo 'Quantidade Correta' condicional).
  - Integração com o backend para operações CRUD (Create, Read, Update, Delete) dos pedidos.
  - Redirecionamento para a página de login da intranet quando necessário.

### 2.2. Backend (NestJS)
- **Tecnologia:** NestJS (Node.js Framework)
- **Funcionalidades:**
  - API RESTful para comunicação com o frontend.
  - Lógica de negócio para manipulação de pedidos de ajuste de multiplicador.
  - Integração com o endpoint de verificação de autenticação da intranet (`/api/v1/verify`).
  - Verificação de perfil de administrador (consultando a tabela 'administradores').
  - Gerenciamento de dados no banco de dados MySQL.
  - Exportação de dados em formato CSV para administradores.
  - Exposição de endpoints para acesso externo ao banco de dados (SAS/MySQL Clients).

### 2.3. Banco de Dados (MySQL)
- **Tecnologia:** MySQL
- **Estrutura:** Baseada na tabela 'ajuste_multiplicador' (detalhes da estrutura serão definidos na fase de implementação).
- **Acesso:** Configurado para permitir acesso externo para automatização (SAS/MySQL Clients).

### 2.4. Autenticação
- **Integração:** Utilizar os endpoints da intranet (`/api/v1/verify` e `/api/v1/login`) para autenticação e obtenção de dados do usuário.
- **Testes:** Utilizar dados fictícios para simular o autenticador durante o desenvolvimento e testes.

## 3. Versionamento e Deploy
- **Versionamento:** GitHub para controle de versão do código-fonte.
- **Deploy:** Coolify (`c4mbr4i4.com.br`) para deploy automático da aplicação (CI/CD).

## 4. Documentação
- Será criada uma documentação abrangente cobrindo:
  - Instruções de configuração do ambiente de desenvolvimento.
  - Detalhes da arquitetura e design da aplicação.
  - Configuração do CI/CD no Coolify.
  - Parametrização específica do Coolify para a aplicação.
  - Guia de uso para usuários e administradores.

## 5. Plano de Desenvolvimento
1. Configuração do ambiente de desenvolvimento (Next.js, NestJS, MySQL).
2. Implementação do backend (NestJS):
   - Configuração do banco de dados e modelos.
   - Implementação da lógica de autenticação e verificação de administrador.
   - Desenvolvimento dos endpoints para CRUD de pedidos de ajuste.
   - Implementação da funcionalidade de exportação CSV.
3. Implementação do frontend (Next.js):
   - Criação das rotas e páginas (`/inclusao`, `/consultar`, `/administrar`).
   - Desenvolvimento dos componentes de UI e formulários.
   - Integração com a API do backend.
   - Implementação das regras de negócio no frontend.
4. Testes e validação.
5. Documentação e preparação para deploy.


