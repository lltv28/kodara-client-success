import type { ReactNode } from 'react';

export interface User {
  name: string;
  role: string;
  avatar: string;
}

export interface SidebarItem {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: number; // notification count
}

export interface ConversationHistoryItem {
  title: string;
  time: string; // e.g., "2h ago", "Yesterday"
  active?: boolean; // currently selected conversation
}

export interface SidebarConfig {
  logo: ReactNode;
  appName: string;
  items: SidebarItem[];
  activeContext: {
    title: string;
    subtitle: string;
    icon: ReactNode;
  };
  conversationHistory?: ConversationHistoryItem[];
}

export interface ChatMessage {
  type: 'user' | 'ai';
  content: ReactNode; // Can be text or complex component
  image?: string; // For user uploaded image
}

export interface MetricsData {
  label: string;
  value: string; // e.g., "850 / 2000"
  subValue?: string; // e.g., "+450 kcal new"
  progress: {
    value: number; // percentage
    color: string; // Tailwind class
  }[];
}

export interface AIResponseData {
  sources?: {
    count: number;
    icons: string[]; // URLs or names of icons
    label: string;
  };
  text: string;
  timestamp?: string; // e.g., "2:35 PM"
  workSteps?: string[]; // completed work steps shown above the response
  metrics?: MetricsData[];
  chart?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  summary?: ReactNode;
  table?: {
    headers: string[];
    rows: {
      cells: {
        content: string;
        color?: string; // Optional text/bg color class
      }[];
    }[];
  };
  habitTracker?: {
    habits: {
      name: string;
      streak: number;
      history: boolean[]; // true = completed, false = missed
    }[];
  };
}

export interface DemoConfig {
  id: string;
  name: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  user: User;
  sidebar: SidebarConfig;
  chat: {
    userMessage: {
      image?: string;
      audio?: {
        fileName: string;
        duration: string;
      };
      text: string;
      timestamp?: string; // e.g., "2:34 PM"
    };
    aiResponse: AIResponseData;
    followUpText?: string; // partially typed text in the input box
  };
}
