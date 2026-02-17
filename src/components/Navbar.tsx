import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navItems = [
  { path: "/", label: "Главная", icon: "Home" },
  { path: "/profile", label: "Профиль", icon: "User" },
  { path: "/chats", label: "Чаты", icon: "MessageSquare" },
];

const Navbar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-neon-green/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded border border-neon-green/30 flex items-center justify-center bg-neon-green/5 group-hover:bg-neon-green/10 transition-all">
            <Icon name="Shield" size={18} className="text-neon-green" />
          </div>
          <span className="font-mono font-bold text-neon-green tracking-wider text-sm">
            АНОНИМНЕТ
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  relative px-4 py-2 rounded font-mono text-xs tracking-wider uppercase transition-all duration-300
                  ${isActive
                    ? "text-neon-green bg-neon-green/10 neon-border"
                    : "text-muted-foreground hover:text-neon-green hover:bg-neon-green/5"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon name={item.icon} size={14} />
                  <span>{item.label}</span>
                </div>
                {(isActive || isHovered) && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-neon-green shadow-[0_0_5px_var(--neon-green)]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-neon-green/5 border border-neon-green/20">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse-neon" />
            <span className="font-mono text-[10px] text-neon-green/70 tracking-wider">ЗАЩИЩЁН</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
