import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DemoConfig } from '../types/demo';
import { nutritionDemo } from '../config/demos/nutrition';
import { weddingDemo } from '../config/demos/wedding';
import { financialDemo } from '../config/demos/financial';
import { vocalDemo } from '../config/demos/vocal';
import { marriageDemo } from '../config/demos/marriage';
import { lucasDemo } from '../config/demos/lucas';
import { careerDemo } from '../config/demos/career';
import { sobrietyDemo } from '../config/demos/sobriety';
import { salesDemo } from '../config/demos/sales';

// Add new demos here
const AVAILABLE_DEMOS: Record<string, DemoConfig> = {
  nutrition: nutritionDemo,
  wedding: weddingDemo,
  financial: financialDemo,
  vocal: vocalDemo,
  marriage: marriageDemo,
  lucas: lucasDemo,
  career: careerDemo,
  sobriety: sobrietyDemo,
  sales: salesDemo,
};

interface DemoContextType {
  activeDemoId: string;
  activeDemo: DemoConfig;
  switchDemo: (id: string) => void;
  availableDemos: { id: string; name: string }[];
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [activeDemoId, setActiveDemoId] = useState<string>('nutrition');

  const switchDemo = (id: string) => {
    if (AVAILABLE_DEMOS[id]) {
      setActiveDemoId(id);
    } else {
      console.warn(`Demo with id "${id}" not found.`);
    }
  };

  const activeDemo = AVAILABLE_DEMOS[activeDemoId];

  const availableDemos = Object.values(AVAILABLE_DEMOS).map((demo) => ({
    id: demo.id,
    name: demo.name,
  }));

  return (
    <DemoContext.Provider value={{ activeDemoId, activeDemo, switchDemo, availableDemos }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
