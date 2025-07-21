import { ReactNode } from "react";
import { Home, LayoutDashboard, Library, MessageSquare, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const sidebarItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Library, label: "Library", path: "/library" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Settings, label: "Account", path: "/account" },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Function to get breadcrumb based on current route
  const getBreadcrumb = () => {
    if (location.pathname.startsWith('/tender/')) {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Search</span>
          <span>&gt;</span>
          <span>Tenders</span>
          <span>&gt;</span>
          <span className="text-foreground">Opportunity</span>
        </div>
      );
    } else if (location.pathname === '/dashboard') {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Search</span>
          <span>&gt;</span>
          <span>Tenders</span>
          <span>&gt;</span>
          <span className="text-foreground">Results</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Search</span>
        <span>&gt;</span>
        <span>Tender</span>
        <span>&gt;</span>
        <span className="text-foreground">Results</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-20 bg-muted/30 border-r border-border min-h-screen">
        <nav className="p-2 space-y-2 mt-14">
          {sidebarItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-14 bg-background border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-primary-foreground rounded-sm"></div>
            </div>
            {getBreadcrumb()}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;