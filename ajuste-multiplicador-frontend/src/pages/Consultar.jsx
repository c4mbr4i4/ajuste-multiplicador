import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function Consultar() {
  const [ajustes, setAjustes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAjustes();
  }, []);

  const fetchAjustes = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Buscar ajustes do usuário logado
      const response = await fetch('/api/ajustes?matricula=12345678');
      
      if (response.ok) {
        const data = await response.json();
        setAjustes(data);
      } else {
        setError('Erro ao carregar ajustes');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
  };

  const getTipoSolicitacaoBadge = (tipo) => {
    return tipo === 'Alteração' ? (
      <Badge variant="default" className="bg-blue-100 text-blue-800">
        {tipo}
      </Badge>
    ) : (
      <Badge variant="destructive" className="bg-red-100 text-red-800">
        {tipo}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Carregando...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Minhas Solicitações de Ajuste</CardTitle>
          <Button onClick={fetchAjustes} variant="outline">
            Atualizar
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-500 bg-red-50">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {ajustes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma solicitação encontrada.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo de Solicitação</TableHead>
                    <TableHead>Quantidade Correta</TableHead>
                    <TableHead>Data da Solicitação</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ajustes.map((ajuste) => (
                    <TableRow key={ajuste.id}>
                      <TableCell className="font-medium">
                        #{ajuste.id}
                      </TableCell>
                      <TableCell>
                        {getTipoSolicitacaoBadge(ajuste.tipo_solicitacao)}
                      </TableCell>
                      <TableCell>
                        {ajuste.quantidade_correta || '-'}
                      </TableCell>
                      <TableCell>
                        {formatDate(ajuste.data_solicitacao)}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={ajuste.observacoes}>
                          {ajuste.observacoes || '-'}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

