import { useState } from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleAuth = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  const getUserName = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <>
      {!isAuthenticated ? (
        <AuthPage onAuth={handleAuth} />
      ) : (
        <Dashboard userName={getUserName(userEmail)} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
