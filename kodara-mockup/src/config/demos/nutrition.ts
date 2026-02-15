import React from 'react';
import { UtensilsCrossed, Apple, Flame, ClipboardList, TrendingUp, Sun } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const nutritionDemo: DemoConfig = {
  id: 'nutrition',
  name: 'Nutrition AI',
  theme: {
    primaryColor: 'emerald-700',
    secondaryColor: 'emerald-50',
  },
  user: {
    name: "Andre M.",
    role: 'Cutting Phase',
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(Apple, { size: 24, className: "text-emerald-600" }),
    appName: 'NutriTrack',
    items: [
      { icon: React.createElement(UtensilsCrossed, { size: 20 }), label: 'Log Meal', active: true },
      { icon: React.createElement(ClipboardList, { size: 20 }), label: 'My Meals', badge: 3 },
      { icon: React.createElement(Flame, { size: 20 }), label: 'Macros' },
      { icon: React.createElement(TrendingUp, { size: 20 }), label: 'Progress' },
      { icon: React.createElement(Apple, { size: 20 }), label: 'Meal Plans' },
    ],
    activeContext: {
      title: 'Lunch Scan',
      subtitle: '5 min',
      icon: React.createElement(Sun, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Lunch Scan — Chicken Salad', time: 'Just now', active: true },
      { title: 'Breakfast Log — Oatmeal & Eggs', time: '9:15 AM' },
      { title: 'Weekly Macro Summary', time: 'Yesterday' },
      { title: 'Dinner Ideas — Low Fat', time: '2 days ago' },
    ]
  },
  chat: {
    userMessage: {
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      text: "Here is a picture of my lunch. Can you break down the macros and tell me how this fits into my daily plan?",
      timestamp: '2:34 PM'
    },
    aiResponse: {
      text: "Got it. I've logged this salad (approx. 450 kcal) and added it to your daily total. Taking into account your breakfast (Oatmeal & Eggs), here is your updated progress for the day:",
      timestamp: '2:35 PM',
      workSteps: ['Identified food items via image recognition', 'Calculated macro breakdown', 'Cross-referenced daily meal log', 'Updated daily totals'],
      metrics: [
        {
          label: 'CALORIES (Breakfast + Lunch)',
          value: '850 / 2000',
          subValue: '+450 kcal new',
          progress: [
            { value: 20, color: 'bg-gray-400' },
            { value: 22.5, color: 'bg-black' }
          ]
        },
        {
          label: 'PROTEIN',
          value: '58g / 140g',
          progress: [
            { value: 21, color: 'bg-gray-400' },
            { value: 20, color: 'bg-black' }
          ]
        },
        {
          label: 'CARBS',
          value: '85g / 250g',
          progress: [
            { value: 16, color: 'bg-gray-400' },
            { value: 18, color: 'bg-black' }
          ]
        },
        {
          label: 'FATS',
          value: '28g / 65g',
          progress: [
            { value: 15, color: 'bg-gray-400' },
            { value: 27, color: 'bg-black' }
          ]
        }
      ],
      summary: React.createElement('p', { className: "text-gray-600 text-base" },
        "With breakfast and lunch combined, you're at ",
        React.createElement('span', { className: "font-medium text-gray-900" }, "42%"),
        " of your daily calories. You're well on track with protein, but you've used up a significant portion of your fats for the day. I'd recommend a leaner option for dinner, like grilled chicken or white fish."
      )
    },
    followUpText: 'What should I eat for din'
  }
};
