import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3,
  Package,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard, description: 'Visión general de KPIs' },
  { name: 'Rankings', href: '/rankings', icon: BarChart3, description: 'Top productos por métrica' },
  { name: 'Trends', href: '/trends', icon: TrendingUp, description: 'Análisis de tendencias' },
  { name: 'Products', href: '/products', icon: Package, description: 'Desempeño detallado' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo area */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  KPI Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">Analytics Platform</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "nav-link group relative overflow-hidden",
                    isActive ? "active" : ""
                  )}
                  onMouseEnter={() => setIsHovered(item.name)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-primary",
                    isHovered === item.name && "scale-110 rotate-3"
                  )} />
                  <div className="flex-1">
                    <p className={cn(
                      "font-medium transition-all duration-300",
                      isActive ? "text-white" : "text-gray-700 group-hover:text-primary"
                    )}>
                      {item.name}
                    </p>
                    <p className={cn(
                      "text-xs transition-all duration-300",
                      isActive ? "text-white/80" : "text-gray-400"
                    )}>
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isActive ? "text-white translate-x-0" : "text-transparent -translate-x-2",
                    isHovered === item.name && "text-primary translate-x-0"
                  )} />
                </Link>
              );
            })}
          </nav>

          {/* User area */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-gray-50 to-white p-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold">
                AD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@kpi.com</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300",
        "lg:ml-72"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="flex h-20 items-center justify-between px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex-1" />

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
