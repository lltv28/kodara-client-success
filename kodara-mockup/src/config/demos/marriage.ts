import React from 'react';
import { HeartHandshake, MessageSquare, Anchor, BrainCircuit, CalendarHeart, ShieldCheck } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const marriageDemo: DemoConfig = {
  id: 'marriage',
  name: 'Marriage Coach',
  theme: {
    primaryColor: 'stone-700',
    secondaryColor: 'stone-100',
  },
  user: {
    name: "James D.",
    role: 'Husband & Father',
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(Anchor, { size: 24, className: "text-stone-600" }),
    appName: 'The Anchor',
    items: [
      { icon: React.createElement(MessageSquare, { size: 20 }), label: 'Communication', active: true },
      { icon: React.createElement(BrainCircuit, { size: 20 }), label: 'Mindset' },
      { icon: React.createElement(CalendarHeart, { size: 20 }), label: 'Date Nights', badge: 1 },
      { icon: React.createElement(ShieldCheck, { size: 20 }), label: 'Accountability' },
      { icon: React.createElement(HeartHandshake, { size: 20 }), label: 'Conflict Res.' },
    ],
    activeContext: {
      title: 'Weekly Check-in',
      subtitle: 'Reflection',
      icon: React.createElement(MessageSquare, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Chore Argument — Repair Plan', time: 'Just now', active: true },
      { title: 'Date Night Ideas for March', time: '4:15 PM' },
      { title: 'Communication Check-in', time: 'Yesterday' },
      { title: 'Conflict Resolution Framework', time: 'Sun' },
    ]
  },
  chat: {
    userMessage: {
      text: "We had an argument about household chores again. I feel like I do a lot, but she says I'm not mentally present. I got defensive and shut down. How do I fix this?",
      timestamp: '8:42 PM'
    },
    aiResponse: {
      text: "This is a classic **content vs. connection** issue. You're focusing on the task list (content), while she's feeling a lack of emotional partnership (connection). When she says you're not 'mentally present,' she's not asking you to do more chores — she's saying she feels alone even when you're in the room.\n\nThe defensiveness is natural, but it shuts down the conversation. When you shut down, she hears: *'Your feelings aren't important enough for me to stay engaged.'*\n\n**Repair plan for tonight:** Go to her, make eye contact, and say: *'I realized I checked out earlier. You needed me to be a partner, not just a task-completer. I'm sorry I shut down.'* Then stop talking and just listen.",
      timestamp: '8:43 PM',
      workSteps: ['Reviewed conversation history & patterns', 'Built personalized repair framework'],
      habitTracker: {
        habits: [
          {
            name: 'Active Listening',
            streak: 3,
            history: [false, true, false, false, true, true, true]
          },
          {
            name: 'Quality Time',
            streak: 2,
            history: [false, false, true, false, false, true, true]
          },
          {
            name: 'Words of Affirmation',
            streak: 5,
            history: [false, false, true, true, true, true, true]
          }
        ]
      },
      summary: React.createElement('p', { className: "text-gray-600 text-base" },
        "Going forward, try the ",
        React.createElement('span', { className: "font-medium text-gray-900" }, "6-second pause"),
        " technique: when you feel the urge to defend yourself, pause for 6 seconds and ask instead, ",
        React.createElement('span', { className: "italic text-stone-800" }, "'Help me understand what you need from me right now.'"),
        " This shifts you from defense mode to connection mode. Can you commit to trying this tonight?"
      )
    },
    followUpText: 'What if she brings up the same topic again'
  }
};
