import React from 'react';
import { Briefcase, UserCheck, BookOpen, GraduationCap, FileText, Send } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const careerDemo: DemoConfig = {
  id: 'career',
  name: 'Career Coach (Curtis)',
  theme: {
    primaryColor: 'cyan-700',
    secondaryColor: 'cyan-50',
  },
  user: {
    name: "Jordan Lee",
    role: 'Senior Student',
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(GraduationCap, { size: 24, className: "text-cyan-600" }),
    appName: 'Curtis',
    items: [
      { icon: React.createElement(UserCheck, { size: 20 }), label: 'Interview Prep', active: true },
      { icon: React.createElement(Briefcase, { size: 20 }), label: 'Job Tracker' },
      { icon: React.createElement(FileText, { size: 20 }), label: 'Resume Review' },
      { icon: React.createElement(BookOpen, { size: 20 }), label: 'Skills Gap' },
      { icon: React.createElement(Send, { size: 20 }), label: 'Applications', badge: 3 },
    ],
    activeContext: {
      title: 'Product Mgmt Role',
      subtitle: 'Interviewing',
      icon: React.createElement(Briefcase, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Stripe Interview Prep', time: 'Just now', active: true },
      { title: 'Resume Feedback — PM Role', time: '2:10 PM' },
      { title: 'Salary Negotiation Strategy', time: 'Yesterday' },
      { title: 'Cover Letter Draft — Notion', time: 'Tue' },
    ]
  },
  chat: {
    userMessage: {
      text: "I have a behavioral interview tomorrow with Stripe. I'm nervous about the 'Tell me about a time you failed' question. Can you give me a mock question and grade my STAR method response?",
      timestamp: '4:15 PM'
    },
    aiResponse: {
      text: "Let's do it. Here is the scenario: 'Tell me about a time you had to pivot a project strategy last minute due to new data.' Give me your response, and I'll grade it on Situation, Task, Action, and Result.",
      timestamp: '4:16 PM',
      workSteps: ['Generated behavioral question from STAR framework'],
      metrics: [
        {
          label: 'INTERVIEW READINESS',
          value: '72 / 100',
          subValue: '+15 pts this week',
          progress: [
            { value: 72, color: 'bg-cyan-600' }
          ]
        },
        {
          label: 'APPLICATIONS SENT',
          value: '12 / 15',
          subValue: 'Goal: 15 this month',
          progress: [
            { value: 80, color: 'bg-cyan-400' }
          ]
        },
        {
          label: 'RESPONSE RATE',
          value: '8.5%',
          subValue: 'Industry avg: 6%',
          progress: [
             { value: 42, color: 'bg-emerald-400' }
          ]
        }
      ],
      summary: React.createElement('p', { className: "text-gray-600 text-base" },
        "Remember, when discussing failure or pivots, focus 60% of your answer on the ",
        React.createElement('span', { className: "font-medium text-gray-900" }, "Action"),
        " and ",
        React.createElement('span', { className: "font-medium text-gray-900" }, "Result"),
        ". Don't dwell on the negative situation for too long."
      )
    },
    followUpText: "Here's my response: In my last role at"
  }
};
