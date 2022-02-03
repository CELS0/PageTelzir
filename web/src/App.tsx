import { Routes } from './routes';
import { AuthProvider } from './context/auth';

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
