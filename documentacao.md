# Documentação da Ferramenta 'Ajuste de Multiplicador'

## Visão Geral

A ferramenta 'Ajuste de Multiplicador' é uma aplicação web full-stack desenvolvida para permitir que funcionários solicitem ajustes de multiplicador e que administradores gerenciem essas solicitações.

## Tecnologias Utilizadas

### Frontend
- **React** com **Vite** como bundler
- **React Router DOM** para roteamento
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes de interface
- **Lucide React** para ícones

### Backend
- **Flask** (Python) como framework web
- **Flask-CORS** para permitir requisições cross-origin
- **SQLite** como banco de dados (para desenvolvimento)

## Estrutura do Projeto

```
ajuste-multiplicador/
├── ajuste-multiplicador-frontend/     # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                    # Componentes shadcn/ui
│   │   │   └── Layout.jsx             # Layout principal
│   │   ├── pages/
│   │   │   ├── Inclusao.jsx           # Página de inclusão
│   │   │   ├── Consultar.jsx          # Página de consulta
│   │   │   └── Administrar.jsx        # Página de administração
│   │   ├── App.jsx                    # Componente principal
│   │   └── main.jsx                   # Ponto de entrada
│   ├── index.html
│   └── package.json
└── ajuste-multiplicador-backend/      # Backend Flask
    ├── src/
    │   ├── models/
    │   │   ├── user.py                # Modelo de usuário (template)
    │   │   └── ajuste_multiplicador.py # Modelos principais
    │   ├── routes/
    │   │   ├── user.py                # Rotas de usuário (template)
    │   │   └── ajuste_multiplicador.py # Rotas principais
    │   └── main.py                    # Aplicação principal
    ├── simple_server.py               # Servidor simplificado
    └── requirements.txt
```

## Funcionalidades Implementadas

### 1. Autenticação
- Simulação de autenticação com dados fictícios
- Verificação de perfil de administrador
- Dados do usuário preenchidos automaticamente

### 2. Inclusão de Solicitações (`/inclusao`)
- Formulário para criar nova solicitação
- Campos matrícula e nome preenchidos automaticamente (não editáveis)
- Seleção de tipo de solicitação: 'Alteração' ou 'Exclusão'
- Campo 'Quantidade Correta' obrigatório apenas para 'Alteração'
- Campo opcional de observações
- Validação de formulário

### 3. Consulta de Solicitações (`/consultar`)
- Visualização das solicitações do usuário logado
- Tabela com informações detalhadas
- Formatação de datas
- Badges coloridos para tipos de solicitação

### 4. Administração (`/administrar`)
- Acesso restrito a administradores
- Visualização de todas as solicitações
- Funcionalidade de exportação para CSV
- Controle de acesso baseado na tabela 'administradores'

## Rotas da API

### Autenticação
- `GET /api/auth/verify` - Verifica autenticação do usuário
- `GET /api/auth/is-admin?matricula={matricula}` - Verifica se usuário é admin

### Ajustes
- `GET /api/ajustes` - Lista todos os ajustes (admin) ou do usuário específico
- `POST /api/ajustes` - Cria nova solicitação de ajuste
- `GET /api/ajustes/export` - Exporta dados em CSV (admin)

## Regras de Negócio Implementadas

1. **Campos não editáveis**: Matrícula e nome são preenchidos automaticamente
2. **Validação condicional**: Quantidade correta obrigatória apenas para 'Alteração'
3. **Controle de acesso**: Página de administração restrita a administradores
4. **Tipos de solicitação**: Apenas 'Alteração' e 'Exclusão' permitidos

## Dados de Teste

### Usuário Padrão
- Matrícula: 12345678
- Nome: João Silva

### Administrador
- Matrícula: 87654321
- Nome: Maria Administradora

## Configuração e Execução

### Backend
```bash
cd ajuste-multiplicador-backend
source venv/bin/activate
pip install -r requirements.txt
python simple_server.py
```

### Frontend
```bash
cd ajuste-multiplicador-frontend
pnpm install
pnpm run dev --host
```

## URLs de Acesso

- **Aplicação**: http://localhost:5173/
- **Inclusão**: http://localhost:5173/inclusao
- **Consulta**: http://localhost:5173/consultar
- **Administração**: http://localhost:5173/administrar
- **API**: http://localhost:5001/

## Configuração para Produção

### CI/CD com Coolify

1. **Repositório GitHub**: Criar repositório e fazer push do código
2. **Configuração Coolify**:
   - Conectar repositório GitHub
   - Configurar build do frontend: `pnpm run build`
   - Configurar deploy do backend Flask
   - Definir variáveis de ambiente

### Variáveis de Ambiente
```
FLASK_ENV=production
DATABASE_URL=mysql://user:password@host:port/database
SECRET_KEY=your-secret-key
```

### Banco de Dados MySQL

Para produção, substituir SQLite por MySQL:

```sql
-- Tabela de ajustes
CREATE TABLE ajuste_multiplicador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    tipo_solicitacao VARCHAR(20) NOT NULL,
    quantidade_correta DECIMAL(10,2) NULL,
    data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT NULL
);

-- Tabela de administradores
CREATE TABLE administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL
);

-- Inserir administrador padrão
INSERT INTO administradores (matricula, nome) 
VALUES ('87654321', 'Maria Administradora');
```

## Integração com Intranet

Para produção, substituir os dados fictícios pela integração real:

```javascript
// Substituir em todas as chamadas de API
const response = await fetch('https://auth.na.super.intranet.bb.com.br/api/v1/verify');
```

## Melhorias Futuras

1. **Autenticação real** com a intranet
2. **Banco de dados MySQL** em produção
3. **Logs de auditoria** para ações administrativas
4. **Notificações** por email
5. **Filtros avançados** na consulta
6. **Paginação** para grandes volumes de dados
7. **Validações adicionais** no backend
8. **Testes automatizados**

## Suporte

Para dúvidas ou problemas, consulte a documentação técnica ou entre em contato com a equipe de desenvolvimento.

