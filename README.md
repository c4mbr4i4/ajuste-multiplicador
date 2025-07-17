# Ferramenta Ajuste de Multiplicador

Sistema web para solicitação e gerenciamento de ajustes de multiplicador, desenvolvido conforme especificações do documento de requisitos.

## 🚀 Funcionalidades

- ✅ **Inclusão de Solicitações**: Formulário para criar pedidos de ajuste
- ✅ **Consulta Pessoal**: Visualização das próprias solicitações
- ✅ **Administração**: Gestão completa para administradores
- ✅ **Exportação CSV**: Download de dados para análise
- ✅ **Autenticação Simulada**: Integração preparada para intranet
- ✅ **Interface Responsiva**: Design moderno e acessível

## 🛠️ Tecnologias

**Frontend:**
- React + Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM

**Backend:**
- Flask (Python)
- SQLite/MySQL
- Flask-CORS

## 📁 Estrutura

```
├── ajuste-multiplicador-frontend/    # Aplicação React
├── ajuste-multiplicador-backend/     # API Flask
├── documentacao.md                   # Documentação completa
├── requirements.md                   # Requisitos extraídos do PDF
└── architecture_plan.md              # Plano de arquitetura
```

## 🔧 Instalação e Execução

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

## 🌐 Acesso

- **Aplicação**: http://localhost:5173/
- **API**: http://localhost:5001/

### Rotas Diretas
- `/inclusao` - Nova solicitação
- `/consultar` - Minhas solicitações  
- `/administrar` - Painel administrativo

## 👥 Usuários de Teste

**Usuário Padrão:**
- Matrícula: 12345678
- Nome: João Silva

**Administrador:**
- Matrícula: 87654321
- Nome: Maria Administradora

## 📋 Regras de Negócio

- Matrícula e nome preenchidos automaticamente
- Tipo de solicitação: "Alteração" ou "Exclusão"
- Quantidade correta obrigatória apenas para alterações
- Acesso administrativo controlado por tabela específica

## 🚀 Deploy

Preparado para deploy com:
- **GitHub** para versionamento
- **Coolify** para CI/CD automático
- **MySQL** para produção
- **Intranet** para autenticação real

## 📖 Documentação

Consulte `documentacao.md` para informações detalhadas sobre:
- Configuração completa
- Estrutura do banco de dados
- Integração com intranet
- Configuração do Coolify
- Melhorias futuras

---

**Desenvolvido conforme especificações do PDF de requisitos**

