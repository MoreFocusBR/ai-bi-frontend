import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../lib/utils';

export function AppShell() {
  const sidebarOpen = useUIStore(state => state.sidebarOpen);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className={cn(
          "flex-1 transition-all duration-300",
          "md:pl-64",
          !sidebarOpen && "md:pl-16"
        )}>
          <div className="mx-auto max-w-7xl p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
