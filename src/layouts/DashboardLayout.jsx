import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children, currentPath = '/', currentTitle = 'AI Lab Showcase', onNavigate }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative z-10 w-72 h-full bg-sidebar">
            <Sidebar
              isCollapsed={false}
              setIsCollapsed={() => setIsMobileOpen(false)}
              currentPath={currentPath}
              onNavigate={(href) => {
                setIsMobileOpen(false);
                if (onNavigate) onNavigate(href);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <Header
          onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
          currentTitle={currentTitle}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background/50">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
