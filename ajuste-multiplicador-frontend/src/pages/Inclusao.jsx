import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function Inclusao() {
  const [formData, setFormData] = useState({
    matricula: '12345678',
    nome: 'João Silva',
    tipo_solicitacao: '',
    quantidade_correta: '',
    observacoes: ''
  });
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Validações
      if (!formData.tipo_solicitacao) {
        setMessage('Tipo de solicitação é obrigatório');
        setIsLoading(false);
        return;
      }

      if (formData.tipo_solicitacao === 'Alteração' && !formData.quantidade_correta) {
        setMessage('Quantidade correta é obrigatória para alterações');
        setIsLoading(false);
        return;
      }

      // Simular envio para API
      const response = await fetch('/api/ajustes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Solicitação de ajuste criada com sucesso!');
        setFormData({
          ...formData,
          tipo_solicitacao: '',
          quantidade_correta: '',
          observacoes: ''
        });
      } else {
        const error = await response.json();
        setMessage(error.error || 'Erro ao criar solicitação');
      }
    } catch (error) {
      setMessage('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Nova Solicitação de Ajuste de Multiplicador</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Matrícula */}
            <div className="space-y-2">
              <Label htmlFor="matricula">Matrícula</Label>
              <Input
                id="matricula"
                value={formData.matricula}
                disabled
                className="bg-gray-100"
              />
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                disabled
                className="bg-gray-100"
              />
            </div>

            {/* Tipo de Solicitação */}
            <div className="space-y-2">
              <Label htmlFor="tipo_solicitacao">Tipo de Solicitação *</Label>
              <Select
                value={formData.tipo_solicitacao}
                onValueChange={(value) => handleInputChange('tipo_solicitacao', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de solicitação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alteração">Alteração</SelectItem>
                  <SelectItem value="Exclusão">Exclusão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantidade Correta - só aparece se for Alteração */}
            {formData.tipo_solicitacao === 'Alteração' && (
              <div className="space-y-2">
                <Label htmlFor="quantidade_correta">Quantidade Correta *</Label>
                <Input
                  id="quantidade_correta"
                  type="number"
                  step="0.01"
                  value={formData.quantidade_correta}
                  onChange={(e) => handleInputChange('quantidade_correta', e.target.value)}
                  placeholder="Digite a quantidade correta"
                />
              </div>
            )}

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Digite observações adicionais (opcional)"
                rows={4}
              />
            </div>

            {/* Mensagem */}
            {message && (
              <Alert className={message.includes('sucesso') ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
                <AlertDescription className={message.includes('sucesso') ? 'text-green-700' : 'text-red-700'}>
                  {message}
                </AlertDescription>
              </Alert>
            )}

            {/* Botão de Submit */}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Criar Solicitação'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

