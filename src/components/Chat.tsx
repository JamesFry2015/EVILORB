'use client';

import { useChat, Message } from 'ai/react';
import { Scenario } from '@/lib/scenarios';
import { useEffect, useRef, useState } from 'react';
import { Send, Menu, Bot, User } from 'lucide-react';
import { cn } from './Sidebar';

interface ChatProps {
  scenario: Scenario;
  modelName: string;
  onOpenSidebar: () => void;
  onEditScenario: () => void;
}

export function Chat({ scenario, modelName, onOpenSidebar, onEditScenario }: ChatProps) {
  // We include scenarioId, scenario payload, and modelName in the initial request.

  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } = useChat({
    body: {
      scenarioId: scenario.id,
      // We pass the full scenario config to the backend so dynamic edits don't require server-side state persistence
      scenarioConfig: scenario,
      modelName: modelName,
    },
    // Customize the API endpoint if needed, default is /api/chat
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // When scenario changes, reset messages and inject starting situation
  useEffect(() => {
    setMessages([
      {
        id: 'greeting',
        role: 'assistant',
        content: scenario.startingSituation,
      }
    ]);
  }, [scenario.id, scenario.startingSituation, setMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden text-gray-500 dark:text-gray-400"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-lg", scenario.themeColor)}>
            {scenario.thumbnail}
          </div>
          <div>
            <h1 className="font-semibold text-sm sm:text-base">{scenario.title}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Scenario: {scenario.tagline}</p>
          </div>
        </div>
        <button
          onClick={onEditScenario}
          className="text-xs font-medium px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
        >
          Edit Scenario
        </button>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "flex gap-3 max-w-[85%] sm:max-w-[75%]",
              message.role === 'user' ? "flex-row-reverse" : "flex-row"
            )}>
              {/* Avatar */}
              <div className="shrink-0 mt-1">
                {message.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                ) : (
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-sm", scenario.themeColor)}>
                    {scenario.thumbnail}
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words shadow-sm",
                message.role === 'user'
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-sm"
              )}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex w-full justify-start">
             <div className="flex gap-3 max-w-[85%] sm:max-w-[75%]">
               <div className="shrink-0 mt-1">
                 <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-sm animate-pulse", scenario.themeColor)}>
                    {scenario.thumbnail}
                  </div>
               </div>
               <div className="px-5 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-sm flex gap-1 items-center shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
             </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 text-sm mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/50">
            Error: {error.message || 'Failed to fetch response. Check your API key.'}
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <form
          onSubmit={onSubmit}
          className="max-w-4xl mx-auto relative flex items-end gap-2"
        >
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim() && !isLoading) {
                    const form = e.currentTarget.form;
                    if (form) form.requestSubmit();
                  }
                }
              }}
              placeholder={`What do you do in ${scenario.title}?`}
              className="w-full bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 pr-12 min-h-[52px] max-h-32 resize-none outline-none transition-all duration-200 block"
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="shrink-0 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 h-[52px] w-[52px] flex items-center justify-center"
            aria-label="Send action"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="text-center mt-2 text-xs text-gray-400 dark:text-gray-500">
          Press Enter to take action, Shift + Enter for new line. The GM decides the outcome.
        </div>
      </div>
    </div>
  );
}
