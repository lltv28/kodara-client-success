import { useEffect, useState, useRef } from 'react';
import { Share, Plus, Sparkles, Users, FileText, ArrowUp, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useDemo } from '../context/DemoContext';
import { BarChart } from './BarChart';

// Map theme color families to waveform-specific classes
const waveformColorMap: Record<string, { bg: string; hover: string; iconBg: string; iconText: string }> = {
  violet: { bg: 'bg-violet-200', hover: 'hover:bg-violet-400', iconBg: 'bg-violet-100', iconText: 'text-violet-600' },
  red: { bg: 'bg-red-200', hover: 'hover:bg-red-400', iconBg: 'bg-red-100', iconText: 'text-red-600' },
  emerald: { bg: 'bg-emerald-200', hover: 'hover:bg-emerald-400', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600' },
  amber: { bg: 'bg-amber-200', hover: 'hover:bg-amber-400', iconBg: 'bg-amber-100', iconText: 'text-amber-600' },
  rose: { bg: 'bg-rose-200', hover: 'hover:bg-rose-400', iconBg: 'bg-rose-100', iconText: 'text-rose-600' },
  slate: { bg: 'bg-slate-200', hover: 'hover:bg-slate-400', iconBg: 'bg-slate-100', iconText: 'text-slate-600' },
  cyan: { bg: 'bg-cyan-200', hover: 'hover:bg-cyan-400', iconBg: 'bg-cyan-100', iconText: 'text-cyan-600' },
  stone: { bg: 'bg-stone-200', hover: 'hover:bg-stone-400', iconBg: 'bg-stone-100', iconText: 'text-stone-600' },
  sky: { bg: 'bg-sky-200', hover: 'hover:bg-sky-400', iconBg: 'bg-sky-100', iconText: 'text-sky-600' },
};

function getWaveformColors(primaryColor: string) {
  const family = primaryColor.split('-')[0];
  return waveformColorMap[family] || waveformColorMap.violet;
}

export function MainContent() {
  const { activeDemo, activeDemoId } = useDemo();
  const { user, chat, sidebar, theme } = activeDemo;
  const waveColors = getWaveformColors(theme.primaryColor);
  const [visible, setVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const prevDemoId = useRef(activeDemoId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (prevDemoId.current !== activeDemoId) {
      setVisible(false);
      setIsPlaying(false);
      const timer = setTimeout(() => {
        prevDemoId.current = activeDemoId;
        setVisible(true);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeDemoId]);

  function handleShare() {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  }

  function handleSend() {
    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.focus();
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#fbfbfb] relative">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-gray-100/80">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-gray-700">{user.name}</h1>
          <span className={`bg-${theme.secondaryColor} text-${theme.primaryColor} text-[10px] px-2.5 py-0.5 rounded-full font-medium tracking-wide`}>{user.role}</span>
        </div>
        <div className="relative">
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
            title="Share conversation"
          >
            {shareToast ? <Check size={18} className="text-emerald-500" /> : <Share size={18} />}
          </button>
          {shareToast && (
            <div className="absolute top-full right-0 mt-1 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
              Link copied!
            </div>
          )}
        </div>
      </header>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 lg:px-28 xl:px-40 w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 250ms ease, transform 250ms ease',
        }}
      >
        <div className="flex flex-col gap-6 pt-10 pb-48">

          {/* User Message */}
          <div className="self-end max-w-2xl w-full flex flex-col items-end gap-2">
             {/* User avatar + name row */}
             <div className="flex items-center gap-2 mr-1">
               <span className="text-xs text-gray-400 font-medium">{user.name}</span>
               <img
                 src={user.avatar}
                 alt={user.name}
                 className="w-6 h-6 rounded-full object-cover ring-2 ring-gray-100"
               />
             </div>

             {chat.userMessage.audio ? (
               <div className="bg-white border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.06)] rounded-2xl rounded-tr-md p-4 max-w-xl w-full flex flex-col gap-4">
                  {/* Audio Header */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`w-9 h-9 rounded-full ${waveColors.iconBg} flex items-center justify-center ${waveColors.iconText} shrink-0 cursor-pointer hover:scale-105 transition-transform active:scale-95`}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                          <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      )}
                    </button>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-700">{chat.userMessage.audio.fileName}</span>
                      <span className="text-[10px] text-gray-400">{chat.userMessage.audio.duration}</span>
                    </div>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="flex items-center justify-between gap-0.5 h-8 px-1">
                    {[40, 60, 50, 80, 40, 30, 70, 90, 50, 60, 40, 80, 50, 30, 60, 40, 70, 50, 40, 60, 50, 80, 40, 30, 70, 90, 50, 60, 40, 80, 45, 65, 55, 85, 45, 35, 75, 95, 55, 65].map((height, i) => (
                      <div
                        key={i}
                        className={`w-1.5 ${waveColors.bg} rounded-full transition-all ${waveColors.hover}`}
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>

                  {/* Text Message */}
                  <div className="text-gray-700 text-[15px] leading-relaxed pt-3 border-t border-gray-100">
                    {chat.userMessage.text}
                  </div>
               </div>
             ) : (
               <>
                 {chat.userMessage.image && (
                   <div className="bg-white border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.06)] rounded-2xl rounded-tr-md p-2 max-w-xs overflow-hidden">
                      <img
                        src={chat.userMessage.image}
                        alt="User content"
                        className="w-full h-auto rounded-xl"
                      />
                   </div>
                 )}
                 <div className="bg-white border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.06)] rounded-2xl rounded-tr-md p-5 text-gray-700 text-[15px] leading-relaxed max-w-xl">
                   {chat.userMessage.text}
                 </div>
               </>
             )}

             {/* Timestamp */}
             {chat.userMessage.timestamp && (
               <span className="text-[11px] text-gray-300 mr-1 font-medium">{chat.userMessage.timestamp}</span>
             )}
          </div>

          {/* Completed Work Steps */}
          {chat.aiResponse.workSteps && chat.aiResponse.workSteps.length > 0 && (
            <div className="flex gap-3 max-w-2xl w-full">
              <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] text-white font-semibold">{sidebar.appName.charAt(0)}</span>
              </div>
              <div className="flex flex-col gap-1">
                {chat.aiResponse.workSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 shrink-0">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-[13px] text-gray-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Response */}
          <div className="flex flex-col gap-3 max-w-2xl w-full">
             {/* AI avatar + name row */}
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0 overflow-hidden">
                    <span className="text-[10px] text-white font-semibold">{sidebar.appName.charAt(0)}</span>
                </div>
                <span className="text-gray-900 font-semibold text-sm">{sidebar.appName}</span>
             </div>

             <div className="bg-white border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.06)] rounded-2xl rounded-tl-md p-6 text-gray-800 text-[15px] leading-relaxed">
                {chat.aiResponse.sources && (
                  <div className="flex items-center gap-2.5 mb-5 text-xs text-gray-500 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                    <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">
                          {chat.aiResponse.sources.label.split(',')[0]?.trim().charAt(0) || 'S'}
                        </div>
                        <div className="w-5 h-5 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-indigo-600">
                          {chat.aiResponse.sources.label.split(',')[1]?.trim().charAt(0) || 'D'}
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-500">+{chat.aiResponse.sources.count - 2}</div>
                    </div>
                    <span className="font-medium">Analyzed {chat.aiResponse.sources.label}</span>
                  </div>
                )}
                <div className="mb-6 markdown-body">
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1.5" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                      em: ({node, ...props}) => <em className="italic text-gray-600" {...props} />
                    }}
                  >
                    {chat.aiResponse.text}
                  </ReactMarkdown>
                </div>

                {chat.aiResponse.table ? (
                  <div className="mb-6 overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
                        <tr>
                          {chat.aiResponse.table.headers.map((header, i) => (
                            <th key={i} className={`px-4 py-3 ${i !== chat.aiResponse.table!.headers.length - 1 ? 'border-r border-gray-100' : ''}`}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {chat.aiResponse.table.rows.map((row, i) => (
                          <tr key={i} className={`transition-colors hover:bg-gray-50/80 ${i % 2 === 1 ? 'bg-gray-50/30' : ''}`}>
                            {row.cells.map((cell, j) => (
                              <td key={j} className={`px-4 py-3 ${cell.color || 'text-gray-700'} ${j !== row.cells.length - 1 ? 'border-r border-gray-100' : ''}`}>
                                {cell.content}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : chat.aiResponse.habitTracker ? (
                  <div className="mb-6 space-y-3">
                    {chat.aiResponse.habitTracker.habits.map((habit, index) => (
                      <div key={index} className="bg-gray-50/80 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800 text-sm">{habit.name}</span>
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-white border border-gray-200 rounded-full text-gray-500 tabular-nums">
                              {habit.streak} day streak
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 px-1">
                          {habit.history.map((completed, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5">
                              <span className="text-[10px] text-gray-400 font-semibold">
                                {['M','T','W','T','F','S','S'][i]}
                              </span>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                completed
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                                  : 'bg-white border-gray-200 text-gray-300'
                              }`}>
                                {completed ? (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                ) : (
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : chat.aiResponse.chart ? (
                  <div className="mb-6">
                    <BarChart data={chat.aiResponse.chart} />
                  </div>
                ) : chat.aiResponse.metrics && (
                  <div className="space-y-5 text-xs tracking-tight mb-6">
                    {chat.aiResponse.metrics.map((metric, index) => (
                      <div key={index}>
                          <div className="flex justify-between mb-2 font-semibold text-gray-700">
                              <span className="uppercase tracking-wider text-[11px]">{metric.label}</span>
                              <span className="text-gray-900 font-bold tabular-nums">{metric.value}</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 flex rounded-full overflow-hidden">
                              {metric.progress.map((prog, i) => (
                                <div
                                  key={i}
                                  className={`${prog.color} h-2 transition-all duration-700 ease-out`}
                                  style={{ width: `${prog.value}%` }}
                                ></div>
                              ))}
                          </div>
                          {metric.subValue && (
                            <div className="flex justify-between mt-1.5 text-[10px] text-gray-400">
                              <span></span>
                              <span>{metric.subValue}</span>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}

                {chat.aiResponse.summary}
             </div>

             {/* AI Timestamp */}
             {chat.aiResponse.timestamp && (
               <span className="text-[11px] text-gray-300 ml-1 font-medium">{chat.aiResponse.timestamp}</span>
             )}
          </div>

        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6 pt-16 flex justify-center bg-gradient-to-t from-[#fbfbfb] from-60% via-[#fbfbfb]/95 to-transparent pointer-events-none">
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-[0_2px_16px_rgb(0,0,0,0.06)] p-4 relative transition-shadow hover:shadow-[0_4px_20px_rgb(0,0,0,0.1)] pointer-events-auto">
          <textarea
            ref={textareaRef}
            placeholder="Ask a follow-up question..."
            defaultValue={chat.followUpText || ''}
            className="w-full resize-none border-none focus:ring-0 text-gray-700 min-h-[48px] text-[15px] bg-transparent p-2 placeholder-gray-400 focus:outline-none"
          />

          <div className="flex items-center justify-between mt-1 px-1">
            <div className="flex items-center gap-1 text-gray-400">
               <button onClick={() => {}} className="p-2 hover:bg-gray-100 rounded-full hover:text-gray-600 transition-colors active:scale-95" title="Attach file"><Plus size={20} /></button>
               <button onClick={() => {}} className="p-2 hover:bg-gray-100 rounded-full hover:text-gray-600 transition-colors active:scale-95" title="AI Suggestions"><Sparkles size={18} /></button>
               <button onClick={() => {}} className="p-2 hover:bg-gray-100 rounded-full hover:text-gray-600 transition-colors active:scale-95" title="Collaborators"><Users size={18} /></button>
               <button onClick={() => {}} className="p-2 hover:bg-gray-100 rounded-full hover:text-gray-600 transition-colors active:scale-95" title="Documents"><FileText size={18} /></button>
            </div>
            <button
              onClick={handleSend}
              className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all transform active:scale-95"
              title="Send message"
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
