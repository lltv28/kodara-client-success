import React from 'react';
import { Mic, Music, Activity, PlayCircle, Award, Wind } from 'lucide-react';
import type { DemoConfig } from '../../types/demo';

export const vocalDemo: DemoConfig = {
  id: 'vocal',
  name: 'Vocal Coach',
  theme: {
    primaryColor: 'violet-700',
    secondaryColor: 'violet-50',
  },
  user: {
    name: "Mia Song",
    role: 'Vocalist',
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  sidebar: {
    logo: React.createElement(Mic, { size: 24, className: "text-violet-600" }),
    appName: 'Vocalize',
    items: [
      { icon: React.createElement(PlayCircle, { size: 20 }), label: 'Practice' },
      { icon: React.createElement(Wind, { size: 20 }), label: 'Breathing' },
      { icon: React.createElement(Activity, { size: 20 }), label: 'Analysis', active: true },
      { icon: React.createElement(Music, { size: 20 }), label: 'Repertoire', badge: 2 },
      { icon: React.createElement(Award, { size: 20 }), label: 'Goals' },
    ],
    activeContext: {
      title: 'Warm-up Routine',
      subtitle: 'In Progress',
      icon: React.createElement(Activity, { size: 14, className: "text-gray-400" }),
    },
    conversationHistory: [
      { title: 'Chandelier Bridge Analysis', time: 'Just now', active: true },
      { title: 'Warm-up Routine Review', time: '10:30 AM' },
      { title: 'Pitch Accuracy Drill — G4', time: 'Yesterday' },
      { title: 'Breath Support Exercises', time: 'Wed' },
    ]
  },
  chat: {
    userMessage: {
      audio: {
        fileName: 'chandelier_bridge_take3.m4a',
        duration: '0:24'
      },
      text: "I just uploaded my recording of the bridge for 'Chandelier'. I felt a bit tight on the high notes. Can you analyze my pitch accuracy and breath support?",
      timestamp: '11:08 AM'
    },
    aiResponse: {
      text: "I've analyzed your recording of the Chandelier bridge (Take 3). You hit the high F#5, but I detected tension which caused pitch fluctuation. Your breath support dropped right before the jump, which is why the tone sounded thin at the very top.",
      timestamp: '11:09 AM',
      workSteps: ['Processed audio waveform', 'Measured pitch accuracy across range', 'Analyzed breath support & tension patterns', 'Compared against Take 2 baseline'],
      metrics: [
        {
          label: 'PITCH ACCURACY',
          value: '82%',
          subValue: '+4% from Take 2',
          progress: [
            { value: 82, color: 'bg-violet-500' }
          ]
        },
        {
          label: 'BREATH SUPPORT',
          value: '64%',
          subValue: 'Dropped at 0:18',
          progress: [
            { value: 64, color: 'bg-amber-400' }
          ]
        },
        {
          label: 'VOCAL TENSION',
          value: 'Moderate',
          progress: [
            { value: 55, color: 'bg-rose-400' }
          ]
        }
      ],
      summary: React.createElement('div', { className: "space-y-4" },
        React.createElement('p', { className: "text-gray-600 text-base" },
          "To fix this, let's focus on ",
          React.createElement('span', { className: "font-medium text-gray-900" }, "diaphragmatic release"),
          ". Try the 'Lip Trill' exercise for 2 minutes before attempting the bridge again. Focus on keeping the airflow consistent rather than pushing for volume."
        ),
        React.createElement('p', { className: "text-gray-600 text-base" },
          "Additionally, try modifying the vowel shape slightly. Instead of a wide 'Ah', think of a taller, narrower 'Uh' sound as you ascend. This will naturally lift your soft palate and create more space for resonance without straining your vocal cords."
        ),
        React.createElement('p', { className: "text-gray-600 text-base" },
          "Once you feel comfortable with the shape, try singing the phrase again at 70% volume. Power comes from resonance, not pressure. Let me know when you're ready to try another take!"
        )
      )
    },
    followUpText: 'Let me try the lip trill and record another'
  }
};
