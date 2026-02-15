import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Search, PanelLeftClose, MessageSquare, Settings, ChevronDown, LogOut, User, Bell } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export function Sidebar() {
  const { activeDemo, activeDemoId, switchDemo, availableDemos } = useDemo();
  const { sidebar, user, theme } = activeDemo;
  const [showDemoSwitcher, setShowDemoSwitcher] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [activeConvoIndex, setActiveConvoIndex] = useState<number | null>(null);
  const prevDemoId = useRef(activeDemoId);
  const switcherRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Reset active states when demo changes
  useEffect(() => {
    if (prevDemoId.current !== activeDemoId) {
      setVisible(false);
      setActiveItemIndex(null);
      setActiveConvoIndex(null);
      const timer = setTimeout(() => {
        prevDemoId.current = activeDemoId;
        setVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeDemoId]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setShowDemoSwitcher(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    if (showDemoSwitcher || showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDemoSwitcher, showUserMenu]);

  // Determine which nav item is active (from config or user click)
  function isItemActive(index: number, configActive?: boolean): boolean {
    if (activeItemIndex !== null) return activeItemIndex === index;
    return !!configActive;
  }

  // Determine which convo is active
  function isConvoActive(index: number, configActive?: boolean): boolean {
    if (activeConvoIndex !== null) return activeConvoIndex === index;
    return !!configActive;
  }

  if (collapsed) {
    return (
      <div className="w-16 h-full bg-[#FAFAFA] flex flex-col items-center border-r border-gray-100 py-4 shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mb-4"
          title="Expand sidebar"
        >
          <PanelLeftClose size={18} className="rotate-180" />
        </button>
        <div className={`text-${theme.primaryColor} mb-4`}>
          {sidebar.logo}
        </div>
        <nav className="space-y-1">
          {sidebar.items.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveItemIndex(index)}
              className={`p-2.5 rounded-lg transition-all ${
                isItemActive(index, item.active)
                  ? `bg-white text-${theme.primaryColor} shadow-sm`
                  : 'text-gray-400 hover:bg-white/60 hover:text-gray-700'
              }`}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <img
            src={user.avatar}
            alt="User"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-[#FAFAFA] flex flex-col border-r border-gray-100 relative shrink-0">
      {/* Logo */}
      <div
        className="p-4 flex items-center justify-between mb-1"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        <div className="flex items-center gap-2.5">
            <div className={`text-${theme.primaryColor}`}>
              {sidebar.logo}
            </div>
            <span className={`text-lg font-bold text-${theme.primaryColor.replace('700', '900').replace('600', '800')} tracking-tight`}>{sidebar.appName}</span>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
          title="Collapse sidebar"
        >
            <PanelLeftClose size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full bg-white border-none shadow-sm ring-1 ring-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-${theme.primaryColor}/20 text-gray-600 placeholder-gray-400`}
          />
        </div>
      </div>

      {/* Menu */}
      <nav
        className="px-3 space-y-0.5"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        {sidebar.items.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            active={isItemActive(index, item.active)}
            badge={item.badge}
            primaryColor={theme.primaryColor}
            onClick={() => setActiveItemIndex(index)}
          />
        ))}
      </nav>

      {/* Conversation History */}
      {sidebar.conversationHistory && sidebar.conversationHistory.length > 0 && (
        <div
          className="mt-4 px-3 flex-1 min-h-0 overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        >
          <div className="flex items-center gap-2 px-2 mb-2">
            <MessageSquare size={12} className="text-gray-400" />
            <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Recent</span>
          </div>
          <div className="space-y-0.5">
            {sidebar.conversationHistory.map((convo, index) => (
              <div
                key={index}
                onClick={() => setActiveConvoIndex(index)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all text-sm ${
                  isConvoActive(index, convo.active)
                    ? 'bg-white shadow-sm text-gray-900 font-medium'
                    : 'text-gray-500 hover:bg-white/60 hover:text-gray-700'
                }`}
              >
                <span className="truncate flex-1 text-[13px]">{convo.title}</span>
                <span className="text-[10px] text-gray-300 ml-2 shrink-0">{convo.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Area */}
      <div
        className="mt-auto px-3 pb-3 space-y-2"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        {/* Active Context Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-default">
            <div className="flex justify-between items-center mb-0.5">
                 <h3 className="text-sm font-medium text-gray-700">{sidebar.activeContext.title}</h3>
                 <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                {sidebar.activeContext.icon}
                <span>{sidebar.activeContext.subtitle}</span>
            </div>
        </div>

        {/* User Profile with Online Indicator */}
        <div ref={userMenuRef} className="relative">
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
              <div className="flex items-center gap-3 p-2.5">
              <div className="relative">
                  <img
                  src={user.avatar}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  {/* Online indicator */}
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate uppercase tracking-wider font-medium">{user.role}</p>
              </div>
              <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </div>
          </div>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-1.5">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <User size={14} />
                <span>Profile Settings</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell size={14} />
                <span>Notifications</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Demo Switcher Button */}
      <div ref={switcherRef}>
        <button
          onClick={() => setShowDemoSwitcher(!showDemoSwitcher)}
          className="absolute top-4 right-12 p-1.5 text-gray-300 hover:text-gray-500 transition-all rounded-md hover:bg-gray-100"
          title="Switch demo"
        >
          <Settings size={14} />
        </button>

        {/* Demo Switcher Dropdown */}
        {showDemoSwitcher && (
          <div className="absolute top-10 right-4 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 min-w-[200px]">
            <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider px-2.5 py-1.5">Switch Demo</div>
            {availableDemos.map(demo => (
              <button
                key={demo.id}
                onClick={() => { switchDemo(demo.id); setShowDemoSwitcher(false); }}
                className={`w-full text-left px-3 py-2 text-[13px] rounded-lg transition-colors ${
                  demo.id === activeDemo.id
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {demo.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MenuItem({ icon, label, active = false, badge, primaryColor, onClick }: { icon: ReactNode, label: string, active?: boolean, badge?: number, primaryColor: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
      active
        ? `bg-white text-${primaryColor} shadow-sm`
        : 'text-gray-500 hover:bg-white/60 hover:text-gray-900'
    }`}>
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="min-w-[20px] h-[20px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">
          {badge}
        </span>
      )}
    </button>
  );
}
