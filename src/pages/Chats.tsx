import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
  encrypted?: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const chatRooms: ChatRoom[] = [
  { id: "1", name: "Аноним_7291", lastMessage: "Файл доставлен ✓", time: "14:55", unread: 0, online: true },
  { id: "2", name: "Призрак_0042", lastMessage: "Шифрование подтверждено", time: "14:32", unread: 2, online: true },
  { id: "3", name: "Тень_8834", lastMessage: "Встретимся в безопасной зоне", time: "13:10", unread: 0, online: false },
  { id: "4", name: "Нулевой_5567", lastMessage: "Данные уничтожены", time: "12:45", unread: 0, online: false },
  { id: "5", name: "Фантом_1199", lastMessage: "Подключение через узел #4", time: "11:20", unread: 5, online: true },
];

const initialMessages: Message[] = [
  { id: 1, sender: "Аноним_7291", text: "Соединение установлено через безопасный канал", time: "14:30", isOwn: false, encrypted: true },
  { id: 2, sender: "Вы", text: "Подтверждаю. Шифрование E2E активно", time: "14:31", isOwn: true, encrypted: true },
  { id: 3, sender: "Аноним_7291", text: "Отправляю файл через зашифрованный туннель...", time: "14:33", isOwn: false, encrypted: true },
  { id: 4, sender: "Вы", text: "Готов к приёму. Канал чист", time: "14:34", isOwn: true, encrypted: true },
  { id: 5, sender: "Аноним_7291", text: "Файл доставлен ✓", time: "14:55", isOwn: false, encrypted: true },
];

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: messages.length + 1,
      sender: "Вы",
      text: newMessage,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      encrypted: true,
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const selectedRoom = chatRooms.find((r) => r.id === selectedChat);

  return (
    <div className="min-h-screen pt-16 matrix-bg">
      <div className="fixed inset-0 scanline z-0" />

      <div className="relative z-10 max-w-6xl mx-auto h-[calc(100vh-4rem)] flex">
        <div className={`${sidebarOpen ? "w-80" : "w-0 overflow-hidden"} border-r border-neon-green/10 flex flex-col transition-all duration-300`}>
          <div className="p-4 border-b border-neon-green/10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-xs font-bold text-foreground tracking-wider uppercase flex items-center gap-2">
                <Icon name="MessageSquare" size={14} className="text-neon-green" />
                Каналы
              </h2>
              <button className="w-7 h-7 rounded flex items-center justify-center bg-neon-green/5 border border-neon-green/20 hover:bg-neon-green/10 transition-all">
                <Icon name="Plus" size={14} className="text-neon-green" />
              </button>
            </div>
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                className="pl-9 h-8 bg-muted/50 border-neon-green/10 font-mono text-xs focus:border-neon-green/30 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedChat(room.id)}
                className={`w-full p-4 flex items-start gap-3 border-b border-white/5 transition-all hover:bg-neon-green/5 text-left ${
                  selectedChat === room.id ? "bg-neon-green/10 border-l-2 border-l-neon-green" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded bg-muted/50 border border-neon-green/10 flex items-center justify-center">
                    <Icon name="User" size={18} className="text-muted-foreground" />
                  </div>
                  {room.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-neon-green border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-foreground truncate">
                      {room.name}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0">{room.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground truncate">
                      {room.lastMessage}
                    </span>
                    {room.unread > 0 && (
                      <span className="ml-2 w-5 h-5 rounded-full bg-neon-green/20 border border-neon-green/40 flex items-center justify-center font-mono text-[10px] text-neon-green shrink-0">
                        {room.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-14 border-b border-neon-green/10 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden w-8 h-8 rounded flex items-center justify-center hover:bg-muted/50"
              >
                <Icon name="Menu" size={16} className="text-muted-foreground" />
              </button>
              {selectedRoom && (
                <>
                  <div className="w-8 h-8 rounded bg-muted/50 border border-neon-green/10 flex items-center justify-center">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold text-foreground">{selectedRoom.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                      {selectedRoom.online && <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />}
                      {selectedRoom.online ? "в сети" : "не в сети"}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neon-green/5 border border-neon-green/20">
                <Icon name="Lock" size={10} className="text-neon-green" />
                <span className="font-mono text-[9px] text-neon-green/70 tracking-wider">E2E</span>
              </div>
              <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted/50 transition-colors">
                <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex justify-center">
              <span className="font-mono text-[10px] text-muted-foreground/50 px-3 py-1 rounded-full bg-muted/30 border border-white/5">
                🔒 Сообщения защищены сквозным шифрованием
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2.5 ${
                    msg.isOwn
                      ? "bg-neon-green/10 border border-neon-green/20"
                      : "glass-card"
                  }`}
                >
                  {!msg.isOwn && (
                    <div className="font-mono text-[10px] text-neon-cyan mb-1">{msg.sender}</div>
                  )}
                  <p className="font-mono text-xs text-foreground leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    {msg.encrypted && <Icon name="Lock" size={8} className="text-neon-green/40" />}
                    <span className="font-mono text-[9px] text-muted-foreground/50">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-neon-green/10">
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded flex items-center justify-center bg-muted/50 border border-neon-green/10 hover:bg-neon-green/5 hover:border-neon-green/20 transition-all shrink-0">
                <Icon name="Paperclip" size={16} className="text-muted-foreground" />
              </button>
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Введите сообщение..."
                  className="h-9 bg-muted/50 border-neon-green/10 font-mono text-xs pr-10 focus:border-neon-green/30 text-foreground placeholder:text-muted-foreground"
                />
                <Icon name="Lock" size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-green/30" />
              </div>
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded flex items-center justify-center bg-neon-green/10 border border-neon-green/30 hover:bg-neon-green/20 transition-all shrink-0"
              >
                <Icon name="Send" size={16} className="text-neon-green" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
