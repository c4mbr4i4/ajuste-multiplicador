from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class AjusteMultiplicador(db.Model):
    __tablename__ = 'ajuste_multiplicador'
    
    id = db.Column(db.Integer, primary_key=True)
    matricula = db.Column(db.String(20), nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    tipo_solicitacao = db.Column(db.String(20), nullable=False)  # 'Alteração' ou 'Exclusão'
    quantidade_correta = db.Column(db.Float, nullable=True)  # Obrigatório apenas para 'Alteração'
    data_solicitacao = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    observacoes = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<AjusteMultiplicador {self.id} - {self.matricula}>'

    def to_dict(self):
        return {
            'id': self.id,
            'matricula': self.matricula,
            'nome': self.nome,
            'tipo_solicitacao': self.tipo_solicitacao,
            'quantidade_correta': self.quantidade_correta,
            'data_solicitacao': self.data_solicitacao.isoformat() if self.data_solicitacao else None,
            'observacoes': self.observacoes
        }

class Administrador(db.Model):
    __tablename__ = 'administradores'
    
    id = db.Column(db.Integer, primary_key=True)
    matricula = db.Column(db.String(20), unique=True, nullable=False)
    nome = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Administrador {self.matricula} - {self.nome}>'

    def to_dict(self):
        return {
            'id': self.id,
            'matricula': self.matricula,
            'nome': self.nome
        }

