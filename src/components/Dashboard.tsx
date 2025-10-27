import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function Dashboard({ userName, onLogout }: DashboardProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userName={userName} onLogout={onLogout} />
      <ChatArea />
    </div>
  );
}
