import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileSearch, 
  Search, 
  Bot, 
  GraduationCap, 
  Cpu, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  Atom
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import navData from '@/data/navigation.json';
import userData from '@/data/user.json';

const iconMap = {
  LayoutDashboard,
  Sparkles,
  FileSearch,
  Search,
  Bot,
  GraduationCap,
  Cpu,
  Settings,
};

export default function Sidebar({ isCollapsed, setIsCollapsed, currentPath = '/', onNavigate }) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative z-30 flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border shrink-0 shadow-xs"
    >
      {/* Brand Logo & Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border/60">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 shrink-0">
            <Atom className="w-5 h-5 animate-pulse" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5 font-bold text-base tracking-tight text-foreground">
                  <span>PlacementHub</span>
                  <Badge variant="default" className="px-1.5 py-0.2 text-[10px]">LAB</Badge>
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">AI Showcase & Proof-of-Concept</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="ghost"
          size="icon"
          className="hidden md:flex h-7 w-7 rounded-lg border border-sidebar-border/80"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navData.mainNav.map((item, idx) => {
          if (item.isSection) {
            if (isCollapsed) return null;
            return (
              <div
                key={idx}
                className="px-3 pt-5 pb-2 text-[11px] font-bold tracking-wider uppercase text-muted-foreground/70"
              >
                {item.title}
              </div>
            );
          }

          const IconComponent = iconMap[item.icon] || LayoutDashboard;
          const isActive = currentPath === item.href;

          return (
            <button
              key={item.href || idx}
              onClick={() => onNavigate && onNavigate(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group relative cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25 font-semibold'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
              title={isCollapsed ? item.title : undefined}
            >
              <IconComponent
                className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                }`}
              />

              {!isCollapsed && (
                <span className="flex-1 text-left truncate">{item.title}</span>
              )}

              {!isCollapsed && item.badge && (
                <Badge
                  variant={
                    item.badge === 'Active' ? 'success' :
                    item.badge === 'AI' || item.badge === 'New' ? 'default' : 'secondary'
                  }
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* NVIDIA NIM Status Banner */}
      {!isCollapsed && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-emerald-500 animate-bounce" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">NVIDIA NIM Stack</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Accelerated by Llama 3.1 70B & NV-Embed-QA NIMs.
          </p>
        </div>
      )}

      <Separator />

      {/* User Mini Profile */}
      <div className="p-3">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-sidebar-accent/50 border border-sidebar-border/40">
          <Avatar>
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-foreground truncate">{userData.name}</span>
              <span className="text-[10px] text-muted-foreground truncate">{userData.role}</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
