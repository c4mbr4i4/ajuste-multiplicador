from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import csv
import io
from datetime import datetime
import json
import os

app = Flask(__name__)
CORS(app)

# Dados em memória para simulação
ajustes_data = []
administradores_data = [
    {'matricula': '87654321', 'nome': 'Maria Administradora'}
]

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

@app.route('/api/auth/verify', methods=['GET'])
def verify_auth():
    """Simula a verificação de autenticação do usuário"""
    user_type = request.args.get('type', 'user')
    
    if user_type == 'admin':
        return jsonify(MOCK_ADMIN_DATA)
    else:
        return jsonify(MOCK_USER_DATA)

@app.route('/api/auth/is-admin', methods=['GET'])
def is_admin():
    """Verifica se o usuário é administrador"""
    matricula = request.args.get('matricula')
    
    if not matricula:
        return jsonify({'error': 'Matrícula não fornecida'}), 400
    
    admin = next((admin for admin in administradores_data if admin['matricula'] == matricula), None)
    return jsonify({'is_admin': admin is not None})

@app.route('/api/ajustes', methods=['GET'])
def get_ajustes():
    """Consulta ajustes de multiplicador"""
    matricula = request.args.get('matricula')
    
    if matricula:
        # Consulta específica do usuário
        ajustes = [ajuste for ajuste in ajustes_data if ajuste['matricula'] == matricula]
    else:
        # Consulta geral (apenas para administradores)
        ajustes = ajustes_data
    
    return jsonify(ajustes)

@app.route('/api/ajustes', methods=['POST'])
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
    ajuste = {
        'id': len(ajustes_data) + 1,
        'matricula': data['matricula'],
        'nome': data['nome'],
        'tipo_solicitacao': data['tipo_solicitacao'],
        'quantidade_correta': data.get('quantidade_correta'),
        'data_solicitacao': datetime.now().isoformat(),
        'observacoes': data.get('observacoes')
    }
    
    ajustes_data.append(ajuste)
    return jsonify(ajuste), 201

@app.route('/api/ajustes/export', methods=['GET'])
def export_ajustes():
    """Exporta todos os ajustes em formato CSV (apenas para administradores)"""
    # Criar CSV em memória
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Cabeçalho
    writer.writerow(['ID', 'Matrícula', 'Nome', 'Tipo de Solicitação', 'Quantidade Correta', 'Data da Solicitação', 'Observações'])
    
    # Dados
    for ajuste in ajustes_data:
        writer.writerow([
            ajuste['id'],
            ajuste['matricula'],
            ajuste['nome'],
            ajuste['tipo_solicitacao'],
            ajuste.get('quantidade_correta', ''),
            ajuste['data_solicitacao'],
            ajuste.get('observacoes', '')
        ])
    
    # Preparar resposta
    output.seek(0)
    response = make_response(output.getvalue())
    response.headers['Content-Type'] = 'text/csv'
    response.headers['Content-Disposition'] = f'attachment; filename=ajustes_multiplicador_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'
    
    return response

@app.route('/')
def index():
    return jsonify({'message': 'API Ajuste de Multiplicador funcionando!'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

