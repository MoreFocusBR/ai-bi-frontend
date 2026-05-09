import { useState, useRef, useEffect } from 'react';
import { useAIChat } from '../../hooks/useAIChat';
import { ChatBubble } from '../../components/ai/ChatBubble';
import { ChatInput } from '../../components/ai/ChatInput';
import type { Message } from '../../types/ai';
import { Button } from '../../components/ui/button';
import { Bot, RefreshCw } from 'lucide-react';

export function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou seu Q&A Agent de Inteligência Agêntica. Como posso ajudar com a operação, facilities ou ordens de serviço hoje?', agent_used: 'Sistema' }
  ]);
  const [sessionId, setSessionId] = useState<string>(() => crypto.randomUUID());
  
  const { mutate: sendMessage, isPending } = useAIChat();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  const handleSend = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    sendMessage({ message: text, session_id: sessionId }, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response, agent_used: data.agent_used }]);
      },
      onError: (err) => {
        setMessages(prev => [...prev, { role: 'assistant', content: `Ocorreu um erro: ${err.message}`, agent_used: 'Erro' }]);
      }
    });
  };

  const handleReset = () => {
    setSessionId(crypto.randomUUID());
    setMessages([
      { role: 'assistant', content: 'Nova sessão iniciada. Como posso ajudar?', agent_used: 'Sistema' }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b px-6 py-4 bg-muted/50">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-lg font-semibold tracking-tight">Q&A Agent</h2>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset} title="Nova Conversa">
          <RefreshCw className="h-4 w-4 mr-2" />
          Nova Conversa
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg} />
        ))}
        {isPending && (
          <div className="flex justify-start py-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-brand-100 text-brand-900 shadow-sm">
              <Bot className="h-4 w-4 animate-pulse" />
            </div>
            <div className="ml-4 flex items-center">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isPending} />
    </div>
  );
}
