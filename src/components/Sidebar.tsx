import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Upload,
  FileText,
  Settings,
  LogOut,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  userName: string;
  onLogout: () => void;
}

interface Subject {
  name: string;
  progress: number;
  color: string;
}

export default function Sidebar({ userName, onLogout }: SidebarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const subjects: Subject[] = [
    { name: 'Mathematics', progress: 75, color: 'bg-blue-500' },
    { name: 'Artificial Intelligence', progress: 60, color: 'bg-purple-500' },
    { name: 'Machine Learning', progress: 85, color: 'bg-green-500' },
    { name: 'Python Programming', progress: 90, color: 'bg-orange-500' }
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Upload, label: 'Upload Notes', active: false },
    { icon: FileText, label: 'Upload Question Papers', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-72 h-screen bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 flex flex-col"
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">AI Study Planner</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <p className="text-gray-600 text-sm mb-1">Hi, {userName} 👋</p>
          <p className="text-xs text-gray-500 mb-2">{formatDate(currentTime)}</p>
          <p className="text-2xl font-bold text-gray-800">{formatTime(currentTime)}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Progress Overview</h3>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-3 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-700">{subject.name}</span>
                  <span className="text-xs font-bold text-gray-800">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                    className={`${subject.color} h-2 rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all ${
              item.active
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-white hover:shadow-sm'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="p-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
}
