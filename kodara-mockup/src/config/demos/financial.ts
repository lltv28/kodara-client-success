import React from 'react';
import { PieChart, TrendingUp, DollarSign, Target, Shield, CreditCard } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const financialDemo: DemoConfig = {
  id: 'financial',
  name: 'Financial Advisor',
  theme: {
    primaryColor: 'slate-700',
    secondaryColor: 'slate-50',
  },
  user: {
    name: "Jordan Maker",
    role: 'Indie Founder',
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(DollarSign, { size: 24, className: "text-slate-600" }),
    appName: 'WealthWise',
    items: [
      { icon: React.createElement(PieChart, { size: 20 }), label: 'Net Worth' },
      { icon: React.createElement(TrendingUp, { size: 20 }), label: 'Investments', badge: 2 },
      { icon: React.createElement(CreditCard, { size: 20 }), label: 'Cash Flow', active: true },
      { icon: React.createElement(Target, { size: 20 }), label: 'FIRE Goals' },
      { icon: React.createElement(Shield, { size: 20 }), label: 'Tax & Legal' },
    ],
    activeContext: {
      title: 'Weekly Review',
      subtitle: 'Analyzing',
      icon: React.createElement(TrendingUp, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Weekly Cash Flow Review', time: 'Just now', active: true },
      { title: 'Q4 Tax Optimization Strategy', time: '11:00 AM' },
      { title: 'Stripe Revenue Breakdown', time: 'Yesterday' },
      { title: 'FIRE Goal Progress Update', time: 'Tue' },
    ]
  },
  chat: {
    userMessage: {
      text: "How does my burn rate look this week compared to revenue? And based on this month's profit, when do I hit my $500k liquid net worth target?",
      timestamp: '10:22 AM'
    },
    aiResponse: {
      sources: {
        count: 5,
        label: 'Quickbooks, Stripe +3',
        icons: []
      },
      text: "Your cash flow is exceptionally strong this week. Revenue inflows ($42,957) significantly outpaced your spending ($18,462). Here is the breakdown:",
      timestamp: '10:24 AM',
      workSteps: ['Connected to Quickbooks, Stripe, and 3 other sources', 'Aggregated 7-day cash flow data', 'Calculated burn rate vs. revenue trend', 'Projected net worth trajectory to $500k target', 'Checked tax liability implications'],
      chart: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
          {
            label: 'Revenue',
            data: [8240, 12450, 6820, 9180, 6267],
            backgroundColor: 'bg-emerald-500'
          },
          {
            label: 'Expenses',
            data: [3200, 4850, 2100, 5312, 3000],
            backgroundColor: 'bg-slate-300'
          }
        ]
      },
      summary: React.createElement('div', { className: "space-y-4" },
        React.createElement('p', { className: "text-gray-600 text-base" },
          "At your current average monthly profit of $98,000, you are on track to hit your ",
          React.createElement('span', { className: "font-medium text-gray-900" }, "$500k goal in approximately 2 months"),
          ". Your burn rate is well within healthy limits for this revenue level."
        )
      )
    },
    followUpText: 'What about my tax liability for'
  }
};
