import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const securityItems = [
  { label: "Шифрование трафика", status: true, protocol: "AES-256-GCM" },
  { label: "Скрытие IP-адреса", status: true, protocol: "Multi-Hop VPN" },
  { label: "Маскировка локации", status: true, protocol: "GeoShield v3" },
  { label: "Защита от утечек DNS", status: true, protocol: "SecureDNS" },
  { label: "Автоуничтожение данных", status: false, protocol: "DeadSwitch" },
];

const activityLog = [
  { time: "14:32", event: "Вход в систему", ip: "███.███.██.███" },
  { time: "14:33", event: "Подключение к узлу #7429", ip: "Маршрут зашифрован" },
  { time: "14:35", event: "Сессия чата открыта", ip: "E2E включено" },
  { time: "14:41", event: "Файл отправлен (2.3 КБ)", ip: "Зашифрован" },
  { time: "14:55", event: "Смена узла → #2918", ip: "Маршрут обновлён" },
];

const Profile = () => {
  const [deadSwitchEnabled, setDeadSwitchEnabled] = useState(false);

  return (
    <div className="min-h-screen pt-16 matrix-bg">
      <div className="fixed inset-0 scanline z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="glass-card rounded-lg p-6 mb-6 animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-lg bg-neon-green/5 border border-neon-green/20 flex items-center justify-center shrink-0">
              <Icon name="Ghost" size={36} className="text-neon-green/60" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-mono text-xl font-bold text-foreground tracking-wider">
                  АНОНИМ_
                  <span className="text-neon-green">{Math.floor(Math.random() * 9000 + 1000)}</span>
                </h1>
                <Badge variant="outline" className="font-mono text-[10px] border-neon-green/30 text-neon-green bg-neon-green/5">
                  ВЕРИФИЦИРОВАН
                </Badge>
              </div>
              <div className="font-mono text-xs text-muted-foreground space-y-1">
                <p>
                  Уровень анонимности: <span className="text-neon-green font-bold">97.3%</span>
                </p>
                <p>
                  Активных сессий: <span className="text-neon-cyan">1</span> · Узлов в цепи: <span className="text-neon-cyan">7</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: "Clock", label: "Время в сети", value: "3ч 24м", color: "text-neon-green" },
            { icon: "ArrowDownUp", label: "Трафик", value: "847 МБ", color: "text-neon-cyan" },
            { icon: "Zap", label: "Скорость", value: "42 Мб/с", color: "text-neon-purple" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-lg p-4 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Icon name={stat.icon} size={16} className={`${stat.color} mb-2`} />
              <div className={`font-mono text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-lg p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-mono text-sm font-bold text-foreground tracking-wider uppercase mb-4 flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-neon-green" />
              Протоколы безопасности
            </h2>
            <div className="space-y-3">
              {securityItems.map((item, i) => {
                const isEnabled = item.label === "Автоуничтожение данных" ? deadSwitchEnabled : item.status;
                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isEnabled ? "bg-neon-green animate-pulse-neon" : "bg-muted-foreground/30"}`} />
                      <div>
                        <div className="font-mono text-xs text-foreground">{item.label}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{item.protocol}</div>
                      </div>
                    </div>
                    {item.label === "Автоуничтожение данных" ? (
                      <button
                        onClick={() => setDeadSwitchEnabled(!deadSwitchEnabled)}
                        className={`font-mono text-[10px] px-3 py-1 rounded border transition-all ${
                          deadSwitchEnabled
                            ? "text-neon-green border-neon-green/30 bg-neon-green/10"
                            : "text-muted-foreground border-muted hover:border-neon-green/20 hover:text-neon-green"
                        }`}
                      >
                        {deadSwitchEnabled ? "ВКЛ" : "ВЫКЛ"}
                      </button>
                    ) : (
                      <span className="font-mono text-[10px] text-neon-green">АКТИВЕН</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card rounded-lg p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-mono text-sm font-bold text-foreground tracking-wider uppercase mb-4 flex items-center gap-2">
              <Icon name="Activity" size={16} className="text-neon-cyan" />
              Журнал активности
            </h2>
            <div className="space-y-3">
              {activityLog.map((log, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0"
                >
                  <span className="font-mono text-[10px] text-neon-green/50 w-10 shrink-0 pt-0.5">
                    {log.time}
                  </span>
                  <div>
                    <div className="font-mono text-xs text-foreground">{log.event}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{log.ip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 glass-card rounded-lg p-4 border-neon-green/10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-3">
            <Icon name="AlertTriangle" size={16} className="text-yellow-500/80" />
            <p className="font-mono text-[11px] text-muted-foreground">
              Для максимальной анонимности рекомендуем включить <span className="text-neon-green">Автоуничтожение данных</span> и не использовать реальные данные в профиле.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
