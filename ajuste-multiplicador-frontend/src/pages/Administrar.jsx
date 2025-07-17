import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download } from 'lucide-react';

export function Administrar() {
  const [ajustes, setAjustes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    fetchAllAjustes();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/auth/is-admin?matricula=87654321');
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.is_admin);
      }
    } catch (error) {
      console.error('Erro ao verificar status de admin:', error);
    }
  };

  const fetchAllAjustes = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/ajustes');
      
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

  const exportToCsv = async () => {
    try {
      const response = await fetch('/api/ajustes/export');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `ajustes_multiplicador_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError('Erro ao exportar dados');
      }
    } catch (error) {
      setError('Erro ao exportar dados');
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

  if (!isAdmin) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <Alert className="border-red-500 bg-red-50">
              <AlertDescription className="text-red-700">
                Acesso negado. Você não tem permissão para acessar esta página.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <CardTitle>Administração - Todas as Solicitações</CardTitle>
          <div className="flex gap-2">
            <Button onClick={exportToCsv} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
            <Button onClick={fetchAllAjustes} variant="outline">
              Atualizar
            </Button>
          </div>
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
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Nome</TableHead>
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
                        {ajuste.matricula}
                      </TableCell>
                      <TableCell>
                        {ajuste.nome}
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

