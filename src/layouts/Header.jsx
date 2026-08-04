import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Laptop, 
  Menu, 
  Check,
  Cpu
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import userData from '@/data/user.json';

export default function Header({ onToggleMobileSidebar, currentTitle = 'AI Lab Showcase' }) {
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const unreadCount = userData.notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 md:px-6 bg-card/80 backdrop-blur-md border-b border-border/60 shadow-xs">
      {/* Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <Button
          onClick={onToggleMobileSidebar}
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg text-foreground tracking-tight">{currentTitle}</h1>
          <Badge variant="success" className="hidden sm:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            NVIDIA NIM Core
          </Badge>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden lg:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search AI Proof of Concepts, resumes, jobs..."
            className="pl-9 pr-12 bg-muted/50"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-muted-foreground px-1.5 py-0.5 rounded border border-border bg-background">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* NVIDIA NIM Pill Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sidebar-accent border border-sidebar-border text-xs text-sidebar-foreground">
          <Cpu className="w-4 h-4 text-blue-500" />
          <span className="font-medium">NVIDIA Llama 3.1 70B</span>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</span>
        </div>

        {/* Theme Switcher Menu */}
        <div className="relative">
          <Button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            variant="ghost"
            size="icon"
            className="rounded-xl"
            title="Toggle Light / Dark theme"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </Button>

          {showThemeMenu && (
            <div className="absolute right-0 mt-2 w-36 py-1 bg-card border border-border rounded-xl shadow-lg z-50 animate-in fade-in zoom-in-95">
              <button
                onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Light</span>
                </div>
                {theme === 'light' && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
              <button
                onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span>Dark</span>
                </div>
                {theme === 'dark' && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
              <button
                onClick={() => { setTheme('system'); setShowThemeMenu(false); }}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-slate-400" />
                  <span>System</span>
                </div>
                {theme === 'system' && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <Button
            onClick={() => setShowNotifications(!showNotifications)}
            variant="ghost"
            size="icon"
            className="relative rounded-xl"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-card" />
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 p-3 bg-card border border-border rounded-2xl shadow-xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2">
                <span className="font-bold text-xs text-foreground">Notifications</span>
                <Badge variant="default">{unreadCount} New</Badge>
              </div>
              <Separator className="mb-2" />
              <div className="space-y-2">
                {userData.notifications.map(n => (
                  <div key={n.id} className="p-2 rounded-xl bg-muted/40 hover:bg-muted transition-colors">
                    <p className="text-xs font-medium text-foreground">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <Avatar className="cursor-pointer border border-border/80">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
