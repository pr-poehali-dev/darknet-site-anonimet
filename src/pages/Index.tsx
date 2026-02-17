import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const stats = [
  { label: "Пользователей онлайн", value: "12,847", icon: "Users" },
  { label: "Зашифрованных сообщений", value: "3.2M", icon: "Lock" },
  { label: "Скрытых соединений", value: "98.7%", icon: "EyeOff" },
];

const features = [
  {
    icon: "ShieldCheck",
    title: "Защита IP",
    desc: "Многоуровневое шифрование скрывает ваш реальный IP-адрес от любых трекеров",
    color: "neon-green",
  },
  {
    icon: "MapPinOff",
    title: "Скрытие локации",
    desc: "Автоматическая маскировка геолокации через распределённую сеть узлов",
    color: "neon-cyan",
  },
  {
    icon: "Fingerprint",
    title: "Нулевой след",
    desc: "Все данные уничтожаются после сессии. Никаких логов, никаких следов",
    color: "neon-purple",
  },
];

const Index = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Добро пожаловать в теневую сеть";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-16 matrix-bg">
      <div className="fixed inset-0 scanline z-0" />

      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-neon" />
            <span className="font-mono text-xs text-neon-green/80 tracking-wider">
              СОЕДИНЕНИЕ ЗАЩИЩЕНО
            </span>
          </div>
        </div>

        <h1 className="font-mono text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="text-foreground">АНОНИМ</span>
          <span className="text-neon-green neon-glow">НЕТ</span>
        </h1>

        <div className="h-8 mb-8">
          <p className="font-mono text-sm md:text-base text-muted-foreground">
            {typedText}
            <span className="inline-block w-2 h-4 bg-neon-green/70 animate-pulse-neon ml-0.5 align-middle" />
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            to="/chats"
            className="group px-8 py-3 bg-neon-green/10 border border-neon-green/30 rounded font-mono text-sm text-neon-green tracking-wider uppercase hover:bg-neon-green/20 hover:neon-border transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Icon name="Terminal" size={16} />
              Войти в сеть
              <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            to="/profile"
            className="px-8 py-3 bg-transparent border border-muted rounded font-mono text-sm text-muted-foreground tracking-wider uppercase hover:border-neon-cyan/30 hover:text-neon-cyan transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Icon name="User" size={16} />
              Мой профиль
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-lg p-4 text-center animate-fade-in"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <Icon name={stat.icon} size={18} className="text-neon-green/60 mx-auto mb-2" />
              <div className="font-mono text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-mono text-xl md:text-2xl font-bold text-foreground tracking-wider">
            <span className="text-neon-cyan neon-glow-cyan">///</span> ПРОТОКОЛЫ ЗАЩИТЫ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card rounded-lg p-6 group hover:border-neon-green/30 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 border border-${feature.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={feature.icon} size={22} className={`text-${feature.color}`} />
              </div>
              <h3 className="font-mono text-sm font-bold text-foreground tracking-wider uppercase mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-card rounded-lg p-6 border border-neon-green/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-neon-green/10 border border-neon-green/20 flex items-center justify-center shrink-0">
              <Icon name="Terminal" size={18} className="text-neon-green" />
            </div>
            <div className="font-mono text-xs text-muted-foreground leading-relaxed space-y-1">
              <p><span className="text-neon-green">$</span> initializing secure connection...</p>
              <p><span className="text-neon-green">$</span> routing through 7 encrypted nodes...</p>
              <p><span className="text-neon-green">$</span> ip address: <span className="text-neon-cyan">███.███.███.███</span> [HIDDEN]</p>
              <p><span className="text-neon-green">$</span> location: <span className="text-neon-cyan">██████████</span> [MASKED]</p>
              <p><span className="text-neon-green">$</span> connection status: <span className="text-neon-green">SECURE ✓</span></p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-neon-green/10 py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground/50 tracking-wider">
            © 2026 АНОНИМНЕТ — ВСЕ СОЕДИНЕНИЯ ЗАШИФРОВАНЫ
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse-neon" />
            <span className="font-mono text-[10px] text-neon-green/50 tracking-wider">v2.0.7</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
