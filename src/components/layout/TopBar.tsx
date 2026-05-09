import { useAuth0 } from '@auth0/auth0-react';
import { useUIStore } from '../../store/useUIStore';
import { Button } from '../ui/button';
import { Menu, LogOut, Moon, Sun } from 'lucide-react';

export function TopBar() {
  const { user, logout } = useAuth0();
  const toggleSidebar = useUIStore(state => state.toggleSidebar);
  const theme = useUIStore(state => state.theme);
  const setTheme = useUIStore(state => state.setTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <span className="text-lg font-bold text-brand-600 dark:text-brand-500 tracking-tight">AI BI Portal</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        <div className="flex items-center gap-2">
          {user?.picture && <img src={user.picture} alt="Avatar" className="h-8 w-8 rounded-full" />}
          <span className="hidden text-sm font-medium sm:block">{user?.name}</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </header>
  );
}
