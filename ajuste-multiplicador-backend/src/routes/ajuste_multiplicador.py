from flask import Blueprint, request, jsonify, make_response
from src.models.ajuste_multiplicador import db, AjusteMultiplicador, Administrador
import csv
import io
from datetime import datetime

ajuste_bp = Blueprint('ajuste', __name__)

# Dados fictícios para simulação do autenticador
MOCK_USER_DATA = {
    'matricula': '12345678',
    'nome': 'João Silva',
    'authenticated': True
}

MOCK_ADMIN_DATA = {
    'matricula': '87654321',
    'nome': 'Maria Administradora',
    'authenticated': True
}

@ajuste_bp.route('/auth/verify', methods=['GET'])
def verify_auth():
    """Simula a verificação de autenticação do usuário"""
    # Para testes, retorna dados fictícios
    # Em produção, faria a chamada real para o endpoint da intranet
    user_type = request.args.get('type', 'user')
    
    if user_type == 'admin':
        return jsonify(MOCK_ADMIN_DATA)
    else:
        return jsonify(MOCK_USER_DATA)

@ajuste_bp.route('/auth/is-admin', methods=['GET'])
def is_admin():
    """Verifica se o usuário é administrador"""
    matricula = request.args.get('matricula')
    
    if not matricula:
        return jsonify({'error': 'Matrícula não fornecida'}), 400
    
    admin = Administrador.query.filter_by(matricula=matricula).first()
    return jsonify({'is_admin': admin is not None})

@ajuste_bp.route('/ajustes', methods=['GET'])
def get_ajustes():
    """Consulta ajustes de multiplicador"""
    matricula = request.args.get('matricula')
    
    if matricula:
        # Consulta específica do usuário
        ajustes = AjusteMultiplicador.query.filter_by(matricula=matricula).all()
    else:
        # Consulta geral (apenas para administradores)
        ajustes = AjusteMultiplicador.query.all()
    
    return jsonify([ajuste.to_dict() for ajuste in ajustes])

@ajuste_bp.route('/ajustes', methods=['POST'])
def create_ajuste():
    """Cria um novo pedido de ajuste de multiplicador"""
    data = request.get_json()
    
    # Validações
    if not data.get('matricula') or not data.get('nome'):
        return jsonify({'error': 'Matrícula e nome são obrigatórios'}), 400
    
    if not data.get('tipo_solicitacao') or data['tipo_solicitacao'] not in ['Alteração', 'Exclusão']:
        return jsonify({'error': 'Tipo de solicitação deve ser "Alteração" ou "Exclusão"'}), 400
    
    if data['tipo_solicitacao'] == 'Alteração' and not data.get('quantidade_correta'):
        return jsonify({'error': 'Quantidade correta é obrigatória para alterações'}), 400
    
    # Criar novo ajuste
    ajuste = AjusteMultiplicador(
        matricula=data['matricula'],
        nome=data['nome'],
        tipo_solicitacao=data['tipo_solicitacao'],
        quantidade_correta=data.get('quantidade_correta'),
        observacoes=data.get('observacoes')
    )
    
    try:
        db.session.add(ajuste)
        db.session.commit()
        return jsonify(ajuste.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao salvar ajuste'}), 500

@ajuste_bp.route('/ajustes/export', methods=['GET'])
def export_ajustes():
    """Exporta todos os ajustes em formato CSV (apenas para administradores)"""
    ajustes = AjusteMultiplicador.query.all()
    
    # Criar CSV em memória
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Cabeçalho
    writer.writerow(['ID', 'Matrícula', 'Nome', 'Tipo de Solicitação', 'Quantidade Correta', 'Data da Solicitação', 'Observações'])
    
    # Dados
    for ajuste in ajustes:
        writer.writerow([
            ajuste.id,
            ajuste.matricula,
            ajuste.nome,
            ajuste.tipo_solicitacao,
            ajuste.quantidade_correta or '',
            ajuste.data_solicitacao.strftime('%d/%m/%Y %H:%M:%S') if ajuste.data_solicitacao else '',
            ajuste.observacoes or ''
        ])
    
    # Preparar resposta
    output.seek(0)
    response = make_response(output.getvalue())
    response.headers['Content-Type'] = 'text/csv'
    response.headers['Content-Disposition'] = f'attachment; filename=ajustes_multiplicador_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'
    
    return response

@ajuste_bp.route('/admin/seed', methods=['POST'])
def seed_admin():
    """Endpoint para popular dados de administradores (apenas para desenvolvimento)"""
    # Verificar se já existem administradores
    if Administrador.query.count() > 0:
        return jsonify({'message': 'Administradores já existem'}), 200
    
    # Criar administrador padrão
    admin = Administrador(
        matricula='87654321',
        nome='Maria Administradora'
    )
    
    try:
        db.session.add(admin)
        db.session.commit()
        return jsonify({'message': 'Administrador criado com sucesso'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao criar administrador'}), 500

