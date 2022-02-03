import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export interface User {
  token: string;
  name: string;
  isAdmin: boolean;
}

export interface Plans {
  title: string;
  plan: number;
  notPlan: number;
}

type AuthContextData = {
  user: User | null;
  loading: boolean;
  plans: Plans[];
  // listPlans: () => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>({} as User | null);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plans[]>([]);

  async function signIn(username: string, password: string) {
    try {
      setLoading(true)

      const { data } = await api.post('/sigin', { username, password });

      const { token } = data;

      await AsyncStorage.setItem("@telzir:me", JSON.stringify(data))
      await AsyncStorage.setItem("@telzir:jwt_access_token", token)

      setUser(data)

    } catch (err) {
      console.log(err);
      throw new Error('Não foi possível autenticar')
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.clear();

    const storage = await AsyncStorage.getItem("@telzir:me");

    if (!storage) {
      setUser(null)
    }

  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem("@telzir:me");
    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      // api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged)
    }
  }

  useEffect(() => {
    loadUserStorageData();
  })

  function listPlans(plans:Plans[]) {
    setPlans(plans)
  }

  return (
    < AuthContext.Provider value={{
      user,
      loading,
      plans,
      // listPlans,
      signIn,
      signOut,
    }
    }>
      {children}
    </AuthContext.Provider >
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context;
}

export { AuthProvider, useAuth }