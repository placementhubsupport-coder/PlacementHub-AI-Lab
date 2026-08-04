import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Bot, Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { copilotService } from '@/services/copilotService';

import ConversationList from './components/ConversationList';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import PromptSuggestions from './components/PromptSuggestions';
import ChatInput from './components/ChatInput';
import ContextSidebar from './components/ContextSidebar';

export default function PlacementCopilotView({ onNavigateModule }) {
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [activeConv, setActiveConv] = useState(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadCopilotData();
  }, []);

  useEffect(() => {
    if (activeConvId) {
      loadConversation(activeConvId);
    }
  }, [activeConvId]);

  useEffect(() => {
    scrollToBottom();
  }, [activeConv?.messages, isSending]);

  const loadCopilotData = async () => {
    try {
      const [convs, prompts] = await Promise.all([
        copilotService.getConversations(),
        copilotService.getSuggestedPrompts(),
      ]);
      setConversations(convs);
      setSuggestedPrompts(prompts);
      if (convs.length > 0) {
        setActiveConvId(convs[0].id);
      }
    } catch (err) {
      console.error('[Placement Copilot] Error loading initial data:', err);
    }
  };

  const loadConversation = async (id) => {
    try {
      const conv = await copilotService.getConversationById(id);
      setActiveConv(conv);
    } catch (err) {
      console.error('[Placement Copilot] Error loading conversation:', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = {
      id: newId,
      title: 'New Copilot Session',
      lastUpdated: 'Just now',
      messageCount: 0,
      context: {
        candidate: 'Arjun Verma',
        targetRole: 'AI / ML Engineer',
        currentScore: 94,
        matchPercentage: 96.4,
        topJob: 'TechCorp AI Labs',
        keySkills: ['PyTorch', 'Transformers', 'NVIDIA NIM']
      },
      messages: []
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
    setActiveConv(newConv);
  };

  const handleSend = async (userText = input) => {
    if (!userText.trim() || isSending || !activeConv) return;

    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      sender: 'user',
      content: userText,
      text: userText,
      timestamp: formattedTime
    };

    const updatedMessages = [...(activeConv.messages || []), userMessage];

    const updatedConv = {
      ...activeConv,
      messages: updatedMessages,
      messageCount: updatedMessages.length,
      lastUpdated: 'Just now'
    };
    setActiveConv(updatedConv);

    setConversations((prev) =>
      prev.map((c) => (c.id === updatedConv.id ? updatedConv : c))
    );

    setInput('');
    setIsSending(true);

    try {
      // Call service layer for intent-aware AI response
      const aiMessage = await copilotService.sendMessage(userText);

      const finalMessages = [...updatedMessages, aiMessage];
      const finalConv = {
        ...updatedConv,
        messages: finalMessages,
        messageCount: finalMessages.length
      };

      setActiveConv(finalConv);
      setConversations((prev) =>
        prev.map((c) => (c.id === finalConv.id ? finalConv : c))
      );
    } catch (err) {
      console.error('[Placement Copilot] Error generating AI response:', err);
      const errorMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        sender: 'ai',
        content: '⚠️ Unable to generate response. Please verify network connection or try again.',
        text: '⚠️ Unable to generate response. Please verify network connection or try again.',
        timestamp: 'Just now'
      };
      const errMessages = [...updatedMessages, errorMessage];
      setActiveConv((prev) => ({
        ...prev,
        messages: errMessages,
        messageCount: errMessages.length
      }));
    } finally {
      setIsSending(false);
    }
  };

  const handleTriggerModuleAction = (targetPoc, label) => {
    setActionNotice(`Simulating orchestrator trigger for: ${label}`);
    setTimeout(() => setActionNotice(null), 3000);
    if (onNavigateModule) {
      onNavigateModule(`/${targetPoc}`);
    }
  };

  return (
    <div className="space-y-4 pb-4 h-[calc(100vh-5rem)] flex flex-col">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 shrink-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <span>Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>AI Modules</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-bold">Placement Copilot</span>
        </div>

        {actionNotice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {actionNotice}
          </motion.div>
        )}
      </div>

      {/* Main 3-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xl">
        {/* Left Column: Conversation History Sidebar (3 cols) */}
        <div className="hidden md:block lg:col-span-3 h-full">
          <ConversationList
            conversations={conversations}
            activeConvId={activeConvId}
            onSelectConv={setActiveConvId}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Center Column: Chat Window (6 cols desktop, 12 cols mobile) */}
        <div className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col h-full bg-background/50">
          {/* Active Chat Header */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-border/70 bg-card">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="font-bold text-sm text-foreground">{activeConv?.title || 'Placement Copilot'}</h3>
                <span className="text-[10px] text-muted-foreground">NVIDIA Llama 3.1 70B Orchestration Engine</span>
              </div>
            </div>
            <Badge variant="success" className="text-[10px]">Online</Badge>
          </div>

          {/* Messages Scroll Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {!activeConv?.messages || activeConv.messages.length === 0 ? (
              <PromptSuggestions
                prompts={suggestedPrompts}
                onSelectPrompt={(title) => handleSend(title)}
              />
            ) : (
              activeConv.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onRegenerate={() => handleSend('Please regenerate the previous recommendation with deeper detail.')}
                  onNavigateModule={onNavigateModule}
                />
              ))
            )}

            {isSending && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <ChatInput
            input={input}
            onInputChange={setInput}
            onSend={() => handleSend(input)}
            isSending={isSending}
          />
        </div>

        {/* Right Column: Context & AI Actions Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 h-full">
          <ContextSidebar
            contextData={activeConv?.context}
            onTriggerModuleAction={handleTriggerModuleAction}
          />
        </div>
      </div>
    </div>
  );
}
