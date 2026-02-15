import React from 'react';
import { Droplets, CalendarCheck, Shield, Heart, Sunrise, BookHeart } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const sobrietyDemo: DemoConfig = {
  id: 'sobriety',
  name: 'Sobriety Companion',
  theme: {
    primaryColor: 'sky-700',
    secondaryColor: 'sky-50',
  },
  user: {
    name: "Casey R.",
    role: 'Day 42',
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(Droplets, { size: 24, className: "text-sky-600" }),
    appName: 'ClearPath',
    items: [
      { icon: React.createElement(CalendarCheck, { size: 20 }), label: 'Daily Check-in', active: true },
      { icon: React.createElement(Shield, { size: 20 }), label: 'Urge Tracker' },
      { icon: React.createElement(BookHeart, { size: 20 }), label: 'Journal' },
      { icon: React.createElement(Heart, { size: 20 }), label: 'Community', badge: 7 },
      { icon: React.createElement(Sunrise, { size: 20 }), label: 'Milestones' },
    ],
    activeContext: {
      title: 'Evening Reflection',
      subtitle: 'Completed',
      icon: React.createElement(CalendarCheck, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Wedding Anxiety — Game Plan', time: 'Just now', active: true },
      { title: 'Evening Check-in', time: '7:30 PM' },
      { title: 'Urge Tracking — Week 6', time: 'Yesterday' },
      { title: 'Meditation Progress Review', time: 'Thu' },
    ]
  },
  chat: {
    userMessage: {
      text: "I'm going to a wedding this weekend, and I'm anxious about the open bar. Everyone will be drinking, and I don't want to explain why I'm not. What should I do?",
      timestamp: '9:15 PM'
    },
    aiResponse: {
      text: "That's a very common trigger. Let's make a plan. First, always have a non-alcoholic drink in your hand so people don't offer. Second, let's practice a simple 'No thanks, I'm sticking to soda tonight' script.",
      timestamp: '9:16 PM',
      workSteps: ['Reviewed 42-day progress history', 'Prepared safety plan template'],
      habitTracker: {
        habits: [
          {
            name: 'No Alcohol',
            streak: 42,
            history: [true, true, true, true, true, true, true]
          },
          {
            name: 'Meditation',
            streak: 12,
            history: [true, true, false, true, true, true, true]
          },
          {
            name: 'Healthy Eating',
            streak: 5,
            history: [false, true, true, true, true, true, true]
          }
        ]
      },
      summary: React.createElement('p', { className: "text-gray-600 text-base" },
        "You have saved ",
        React.createElement('span', { className: "font-medium text-gray-900" }, "$680"),
        " and gained 42 mornings without a hangover. Remember that feeling. If the urge hits at the wedding, step outside and message me instantly."
      )
    },
    followUpText: 'What if someone directly asks me why I stopped'
  }
};
