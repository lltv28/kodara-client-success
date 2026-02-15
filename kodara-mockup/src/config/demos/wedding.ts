import React from 'react';
import { Calendar, Heart, Users, DollarSign, ListTodo, MapPin } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const weddingDemo: DemoConfig = {
  id: 'wedding',
  name: 'Wedding Planner',
  theme: {
    primaryColor: 'rose-700',
    secondaryColor: 'rose-50',
  },
  user: {
    name: "Sarah & Mike",
    role: 'Wedding Planning',
    avatar: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(Heart, { size: 24, className: "text-rose-600" }),
    appName: 'WedPlan',
    items: [
      { icon: React.createElement(Calendar, { size: 20 }), label: 'Timeline' },
      { icon: React.createElement(Users, { size: 20 }), label: 'Guest List', badge: 5 },
      { icon: React.createElement(DollarSign, { size: 20 }), label: 'Budget' },
      { icon: React.createElement(ListTodo, { size: 20 }), label: 'Checklist' },
      { icon: React.createElement(MapPin, { size: 20 }), label: 'Venues', active: true },
    ],
    activeContext: {
      title: 'Venue Selection',
      subtitle: 'Reviewing',
      icon: React.createElement(MapPin, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Venue Review — Willow Creek', time: 'Just now', active: true },
      { title: 'Guest List Update (142 confirmed)', time: '3:20 PM' },
      { title: 'Florist Budget Comparison', time: 'Yesterday' },
      { title: 'Save the Date Design Options', time: 'Mon' },
    ]
  },
  chat: {
    userMessage: {
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      text: "We really like this rustic barn venue for the reception. Is it available for our October date, and does it fit within our remaining budget?",
      timestamp: '3:42 PM'
    },
    aiResponse: {
      text: "I've checked the availability for 'The Old Barn at Willow Creek'. Great news! It is available for October 14th. Here is how it impacts your budget:",
      timestamp: '3:43 PM',
      workSteps: ['Checked venue availability for Oct 14', 'Pulled remaining budget from planner', 'Verified guest capacity requirements', 'Flagged catering vendor restrictions'],
      metrics: [
        {
          label: 'TOTAL BUDGET',
          value: '$28,500 / $35,000',
          subValue: '+$4,500 venue cost',
          progress: [
            { value: 68.5, color: 'bg-gray-300' },
            { value: 12.8, color: 'bg-rose-500' }
          ]
        },
        {
          label: 'VENUE ALLOCATION',
          value: '$8,500 / $10,000',
          progress: [
            { value: 40, color: 'bg-gray-300' },
            { value: 45, color: 'bg-rose-500' }
          ]
        },
        {
          label: 'GUEST CAPACITY',
          value: '150 / 180',
          progress: [
             { value: 83, color: 'bg-gray-300' }
          ]
        }
      ],
      summary: React.createElement('p', { className: "text-gray-600 text-base" },
        "The venue is within your budget, leaving ",
        React.createElement('span', { className: "font-medium text-gray-900" }, "$6,500"),
        " for catering and decorations. Note that this venue requires using their preferred catering vendors, which might affect your food budget."
      )
    },
    followUpText: 'Can you also check if they allow an outside DJ'
  }
};
