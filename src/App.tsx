import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { RequireRole } from './auth/RequireRole';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AssetsPage } from './pages/Assets/AssetsPage';
import { AssetDetailPage } from './pages/Assets/AssetDetailPage';
import { WorkOrdersPage } from './pages/WorkOrders/WorkOrdersPage';
import { WorkOrderDetailPage } from './pages/WorkOrders/WorkOrderDetailPage';
import { AIChatPage } from './pages/AIChat/AIChatPage';
import { ReportsPage } from './pages/Reports/ReportsPage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { AuditPage } from './pages/Audit/AuditPage';
import { LoginPage } from './pages/Login/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        <Route path="/assets">
          <Route index element={<AssetsPage />} />
          <Route path=":id" element={<AssetDetailPage />} />
        </Route>
        
        <Route path="/work-orders">
          <Route index element={<WorkOrdersPage />} />
          <Route path=":id" element={<WorkOrderDetailPage />} />
        </Route>
        
        <Route path="/ai/chat" element={<AIChatPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/audit" element={
          <RequireRole role="admin_tenant"><AuditPage /></RequireRole>
        } />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
