
# Requisitos da Ferramenta 'Ajuste de Multiplicador'

## Nome da Ferramenta
- Ajuste de Multiplicador

## URL
- `multiplicador.c4mbr4i4.com.br`

## Autenticação
- Capturar dados do usuário logado via endpoint: `https://auth.na.super.intranet.bb.com.br/api/v1/verify`
- Redirecionar para login se não logado: `https://auth.na.super.intranet.bb.com.br/api/v1/login`
- Usar dados fictícios para testes.

## Funcionalidades
- Permitir consulta e inclusão de pedidos de ajuste de multiplicador.
- Permitir consulta geral para administradores com exportação de dados em CSV.
- Verificar se o usuário é administrador consultando a matrícula na tabela 'administradores'.

## Banco de Dados
- Acessível externamente (SAS/MySQL Clients).
- Estrutura baseada na tabela 'ajuste_multiplicador'.

## Tecnologias
- Frontend: Next.js
- Backend: NestJS

## Versionamento e Deploy
- Repositório: GitHub
- Deploy automático: Coolify (`c4mbr4i4.com.br`)

## Documentação
- Documentar a ferramenta, incluindo configuração de CI/CD e parametrização do Coolify.

## Regras de Acesso
- Consulta: Não há restrição.
- Inclusão: Não há restrição.
- Consulta Geral (Administrador): Apenas funcionários com acesso de administrador.

## Regras de Negócio
- Campos 'matricula' e 'nome' são preenchidos automaticamente com dados do usuário logado e não podem ser alterados.
- Campo 'Tipo de solicitação' deve ser uma lista com opções: 'Alteração', 'Exclusão'.
- Campo 'Quantidade Correta' é obrigatório apenas quando 'Tipo de solicitação' for 'Alteração'.

## Links Diretos
- Inclusão: `multiplicador.c4mbr4i4.com.br/inclusao`
- Consulta: `multiplicador.c4mbr4i4.com.br/consultar`




## Links Diretos (continuação)
- Administração: `multiplicador.c4mbr4i4.com.br/administrar`

## Funcionalidades (continuação)
- A consulta geral do administrador deve permitir a exportação dos dados no formato CSV.




## Sugestões de Tela
- O PDF contém sugestões de layout para as telas de consulta e inclusão, que serão consideradas durante o desenvolvimento da interface do usuário.


