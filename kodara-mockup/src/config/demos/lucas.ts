import React from 'react';
import { BarChart3, Search, PenTool, Zap, Globe, Target } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const lucasDemo: DemoConfig = {
  id: 'lucas',
  name: 'Lucas AI (Marketing)',
  theme: {
    primaryColor: 'amber-600',
    secondaryColor: 'amber-50',
  },
  user: {
    name: "Growth Team",
    role: 'Marketing Lead',
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(Zap, { size: 24, className: "text-amber-500" }),
    appName: 'Lucas AI',
    items: [
      { icon: React.createElement(BarChart3, { size: 20 }), label: 'Ads Analysis', active: true },
      { icon: React.createElement(Search, { size: 20 }), label: 'Competitors' },
      { icon: React.createElement(PenTool, { size: 20 }), label: 'Copy Creator' },
      { icon: React.createElement(Target, { size: 20 }), label: 'Audiences', badge: 4 },
      { icon: React.createElement(Globe, { size: 20 }), label: 'SEO Trends' },
    ],
    activeContext: {
      title: 'Q3 Campaign',
      subtitle: 'Optimizing',
      icon: React.createElement(BarChart3, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Summer Sale CPA Analysis', time: 'Just now', active: true },
      { title: 'New Hook Brainstorm — Q3', time: '1:45 PM' },
      { title: 'Competitor Ad Research', time: 'Yesterday' },
      { title: 'Landing Page A/B Results', time: 'Mon' },
    ]
  },
  chat: {
    userMessage: {
      text: "Our CPA for the 'Summer Sale' campaign has crept up to $45. Analyze the creative performance and tell me which variation is dragging us down. Also, suggest a new hook.",
      timestamp: '2:12 PM'
    },
    aiResponse: {
      sources: {
        count: 3,
        label: 'HYROS, Facebook Ads, GoHighLevel',
        icons: []
      },
      text: "I've analyzed the last 7 days of ad spend. The video creative 'Unboxing V2' is the culprit with a CPA of $62, while your static image 'Lifestyle Shot 1' is performing efficiently.",
      timestamp: '2:14 PM',
      workSteps: ['Pulled 7-day ad spend from HYROS', 'Cross-referenced Facebook Ads creative data', 'Ranked creatives by CPA & ROAS', 'Generated new hook suggestions'],
      table: {
        headers: ['Campaign', 'Spend', 'CPA', 'ROAS', 'Status'],
        rows: [
          {
            cells: [
              { content: 'Unboxing V2' },
              { content: '$4,248.32' },
              { content: '$62.48', color: 'text-red-600 font-medium' },
              { content: '1.18x', color: 'text-red-600' },
              { content: 'Underperforming', color: 'text-red-700 font-medium' }
            ]
          },
          {
            cells: [
              { content: 'Lifestyle Shot 1' },
              { content: '$2,794.15' },
              { content: '$28.22', color: 'text-emerald-600 font-medium' },
              { content: '3.42x', color: 'text-emerald-600' },
              { content: 'Scaling', color: 'text-emerald-700 font-medium' }
            ]
          },
          {
            cells: [
              { content: 'Carousel UGC' },
              { content: '$1,512.89' },
              { content: '$31.52' },
              { content: '2.76x' },
              { content: 'Stable', color: 'text-gray-700 font-medium' }
            ]
          }
        ]
      },
      summary: React.createElement('p', { className: "text-gray-600 text-base" },
        "Kill 'Unboxing V2' immediately. For a new hook, try targeting the pain point of 'Decision Fatigue'. Suggested copy: ",
        React.createElement('span', { className: "font-medium text-amber-800" }, "'Stop scrolling. Start solving. The only tool you need to launch in minutes, not months.'")
      )
    },
    followUpText: 'Draft the new ad copy with that hook for'
  }
};
