import React from 'react';
import { Phone, BarChart2, Users, FileText, Zap, Trophy } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const salesDemo: DemoConfig = {
  id: 'sales',
  name: 'Sales Coach',
  theme: {
    primaryColor: 'red-700',
    secondaryColor: 'red-50',
  },
  user: {
    name: "Alex Hunter",
    role: 'Account Exec',
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(Trophy, { size: 24, className: "text-red-600" }),
    appName: 'Closer',
    items: [
      { icon: React.createElement(Phone, { size: 20 }), label: 'Call Analysis', active: true },
      { icon: React.createElement(BarChart2, { size: 20 }), label: 'Pipeline', badge: 4 },
      { icon: React.createElement(Users, { size: 20 }), label: 'Contacts' },
      { icon: React.createElement(FileText, { size: 20 }), label: 'Scripts' },
      { icon: React.createElement(Zap, { size: 20 }), label: 'Roleplay' },
    ],
    activeContext: {
      title: 'Q4 Pipeline',
      subtitle: '$240k Open',
      icon: React.createElement(BarChart2, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Acme Corp Discovery Call', time: 'Just now', active: true },
      { title: 'Follow-up Email Draft', time: '11:20 AM' },
      { title: 'Objection Handling Practice', time: 'Yesterday' },
      { title: 'Pipeline Review — Q4 Targets', time: 'Tue' },
    ]
  },
  chat: {
    userMessage: {
      audio: {
        fileName: 'discovery_call_acme_corp.mp3',
        duration: '45:12'
      },
      text: "Just got off the discovery call with Acme Corp. I feel like I lost control of the conversation halfway through when they brought up the budget objection. Can you analyze my response and tell me where I went wrong?",
      timestamp: '11:45 AM'
    },
    aiResponse: {
      text: "I've analyzed the 45-minute call recording with Acme Corp. The momentum shifted at the **22-minute mark** when the prospect mentioned budget constraints. You immediately jumped into defending the price rather than validating their concern, which triggered a defensive posture.\n\nInstead of *\"Our ROI justifies the cost,\"* try labeling their emotion: *\"It sounds like you're under a lot of pressure to keep Q4 lean.\"* This would have disarmed them and encouraged them to open up about specific budget blockers.\n\nYou also missed a **key buying signal at 32:15** when they asked about implementation timelines — this was an opportunity to trial close, but you circled back to feature dumping.",
      timestamp: '11:47 AM',
      workSteps: ['Transcribed 45-min call recording', 'Mapped conversation flow & momentum shifts', 'Analyzed talk-to-listen ratio & pacing', 'Identified key moments & missed signals', 'Scored against discovery call framework'],
      table: {
        headers: ['Metric', 'Your Score', 'Target', 'Grade'],
        rows: [
          {
            cells: [
              { content: 'Talk-to-Listen Ratio' },
              { content: '65% / 35%', color: 'text-red-600 font-medium' },
              { content: '45% / 55%' },
              { content: 'Needs Work', color: 'text-red-600 font-medium' }
            ]
          },
          {
            cells: [
              { content: 'Speaking Pace' },
              { content: '140 wpm', color: 'text-amber-600 font-medium' },
              { content: '120 wpm' },
              { content: 'Slightly Fast', color: 'text-amber-600 font-medium' }
            ]
          },
          {
            cells: [
              { content: 'Open-Ended Questions' },
              { content: '3 of 8' },
              { content: '6+ of 8' },
              { content: 'Low', color: 'text-red-600 font-medium' }
            ]
          },
          {
            cells: [
              { content: 'Longest Monologue' },
              { content: '4m 12s', color: 'text-red-600 font-medium' },
              { content: '< 2m' },
              { content: 'Too Long', color: 'text-red-600 font-medium' }
            ]
          }
        ]
      },
      summary: React.createElement('p', { className: "text-gray-600 text-base" },
        "For your follow-up email, don't just send the pricing deck. Acknowledge the budget concern directly and propose a phased rollout that fits their current fiscal constraints. Would you like me to draft that email for you?"
      )
    },
    followUpText: 'Can you draft that follow-up email focusing on'
  }
};
