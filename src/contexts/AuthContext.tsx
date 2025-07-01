
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface UserRole {
  user_type: 'employee' | 'hr_manager';
  b2b_employee_id?: string;
  hr_manager_id?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: UserRole | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  isLoading: boolean;
  isHRManager: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loadUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('user_type, b2b_employee_id, hr_manager_id')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading user role:', error);
        return;
      }

      setUserRole(data as UserRole);
    } catch (error) {
      console.error('Error loading user role:', error);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Load user role after authentication
          setTimeout(() => {
            loadUserRole(session.user.id);
          }, 0);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);

        // Handle navigation based on auth state
        if (event === 'SIGNED_IN') {
          navigate('/domov');
        } else if (event === 'SIGNED_OUT') {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserRole(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, firstName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
        data: {
          first_name: firstName,
        },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });
    if (error) throw error;
  };

  const isHRManager = userRole?.user_type === 'hr_manager';

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      userRole,
      signIn, 
      signUp, 
      signOut, 
      signInWithGoogle,
      isLoading,
      isHRManager
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
