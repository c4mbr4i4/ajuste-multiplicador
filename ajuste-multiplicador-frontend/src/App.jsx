import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Inclusao } from './pages/Inclusao';
import { Consultar } from './pages/Consultar';
import { Administrar } from './pages/Administrar';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/inclusao" replace />} />
          <Route path="/inclusao" element={<Inclusao />} />
          <Route path="/consultar" element={<Consultar />} />
          <Route path="/administrar" element={<Administrar />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
