
import React, { useState, useEffect } from 'react';
import { AuthPortal } from './components/AuthPortal';
import { Dashboard } from './components/Dashboard';
import { Registration } from './components/Registration';
import { AppState, Student, SystemConfig } from './types';

const DEFAULT_CONFIG: SystemConfig = {
  expectedStudents: 50,
  targetGroupSize: 10,
  activeGroups: 5,
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.REGISTRATION);
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('nova_students');
    return saved ? JSON.parse(saved) : [];
  });

  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('nova_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('nova_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('nova_config', JSON.stringify(config));
  }, [config]);

  const handleRegister = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleUpdateConfig = (newConfig: SystemConfig) => {
    setConfig(newConfig);
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to purge all registration data?")) {
      setStudents([]);
    }
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.LOCKED:
        return <AuthPortal onSuccess={() => setAppState(AppState.DASHBOARD)} />;
      case AppState.DASHBOARD:
        return (
          <Dashboard 
            students={students} 
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onClear={handleClear} 
            onGoToRegistration={() => setAppState(AppState.REGISTRATION)} 
          />
        );
      case AppState.REGISTRATION:
        return (
          <Registration 
            onRegister={handleRegister} 
            onAdminClick={() => setAppState(AppState.LOCKED)}
            existingStudents={students}
            numGroups={config.activeGroups}
          />
        );
      default:
        return null;
    }
  };

  return <div className="min-h-screen">{renderContent()}</div>;
};

export default App;
