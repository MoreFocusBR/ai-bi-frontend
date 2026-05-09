import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../lib/utils';
import { LayoutDashboard, Box, Wrench, MessageSquare, FileText, Settings, Shield } from 'lucide-react';

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/assets', icon: Box, label: 'Ativos' },
  { to: '/work-orders', icon: Wrench, label: 'Ordens de Serviço' },
  { to: '/ai/chat', icon: MessageSquare, label: 'Q&A Agent' },
  { to: '/reports', icon: FileText, label: 'Relatórios' },
  { to: '/settings', icon: Settings, label: 'Configurações' },
  { to: '/audit', icon: Shield, label: 'Auditoria' },
];

export function Sidebar() {
  const sidebarOpen = useUIStore(state => state.sidebarOpen);

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300",
      sidebarOpen ? "w-64" : "w-16",
      "hidden md:block"
    )}>
      <nav className="flex flex-col gap-2 p-4">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-900 dark:hover:bg-brand-900/30 dark:hover:text-brand-100",
              isActive ? "bg-brand-100 text-brand-900 dark:bg-brand-900/50 dark:text-brand-100" : "text-muted-foreground",
              !sidebarOpen && "justify-center"
            )}
            title={!sidebarOpen ? label : undefined}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
