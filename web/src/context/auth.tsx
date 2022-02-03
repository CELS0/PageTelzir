import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../services/apiService";

export interface User {
  token: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextData {
  user: User | null;
  signed: Boolean;
  handlerLogin: (username: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = sessionStorage.getItem("@telzir:jwt_access_token");
      const storageToken = sessionStorage.getItem("@telzir:me");

      console.log(storageUser, storageToken)


      if (storageUser && storageToken) {
        setUser(JSON.parse(storageToken));
      }
    }

    loadStorageData();
  }, []);


  async function handlerLogin(username: string, password: string) {
    try {
      const { data } = await api.post('/sigin', { username, password });

      const { token } = data;
      sessionStorage.setItem('@telzir:jwt_access_token', token);
      sessionStorage.setItem("@telzir:me", JSON.stringify(data));

      setUser(data)

      toast.success('Deu tudo certo')
    } catch {
      toast.error('Ops... Senha ou login incorreto')
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, handlerLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
