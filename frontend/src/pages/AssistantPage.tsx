import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAIResponse } from '@/lib/ai-assistant';
import { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';

export default function AssistantPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: "Hello! I'm your Findefender AI assistant. I can help you understand scan results, risk scores, and provide safety tips. What would you like to know?", timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<string[]>(['How do scans work?', 'What is my risk score?', 'Give me safety tips']);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  React.useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const response = getAIResponse(text);
      const assistantMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.content, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, assistantMessage]);
      if (response.suggestions) setSuggestions(response.suggestions);
    }, 500);
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">Get explanations and safety guidance</p>
      </div>

      <Card variant="elevated" className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", msg.role === 'user' && "justify-end")}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={cn("max-w-[80%] rounded-lg p-3", msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="border-t p-4 space-y-3">
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug, idx) => (
                <Button key={idx} variant="outline" size="sm" onClick={() => handleSend(sug)} className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />{sug}
                </Button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input placeholder="Ask me anything..." value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
            <Button variant="hero" size="icon" onClick={() => handleSend()}><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
