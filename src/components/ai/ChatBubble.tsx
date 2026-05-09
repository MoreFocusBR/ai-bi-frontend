import { cn } from '../../lib/utils';
import type { Message } from '../../types/ai';
import { User, Bot } from 'lucide-react';

export function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn("flex w-full gap-4 py-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-brand-100 text-brand-900 shadow-sm dark:bg-brand-900/50 dark:text-brand-100">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div className={cn(
        "flex flex-col gap-2 rounded-2xl px-4 py-3 max-w-[85%] md:max-w-[75%]",
        isUser 
          ? "bg-brand-600 text-white dark:bg-brand-500 rounded-tr-sm" 
          : "bg-muted text-foreground rounded-tl-sm border"
      )}>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        {message.agent_used && (
          <div className="text-[10px] uppercase font-bold tracking-wider text-brand-600 dark:text-brand-400 mt-1 pt-1 border-t border-border/50">
            Agente: {message.agent_used}
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-muted shadow-sm">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
