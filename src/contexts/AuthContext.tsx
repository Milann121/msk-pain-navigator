
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

  const linkUserToB2BEmployee = async (userEmail: string, userId: string) => {
    try {
      console.log('Checking for B2B employee with email:', userEmail);
      
      // First, check if user already exists in users table
      const { data: existingUser, error: userCheckError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userCheckError && userCheckError.code !== 'PGRST116') {
        console.error('Error checking existing user:', userCheckError);
        return;
      }

      // If user already exists and is linked, no need to proceed
      if (existingUser && existingUser.b2b_employee_id) {
        console.log('User already linked to B2B employee');
        return;
      }

      // Look for B2B employee by email
      const { data: b2bEmployee, error: b2bError } = await supabase
        .from('b2b_employees')
        .select('*')
        .eq('email', userEmail)
        .single();

      if (b2bError && b2bError.code !== 'PGRST116') {
        console.error('Error finding B2B employee:', b2bError);
        return;
      }

      if (b2bEmployee) {
        console.log('Found B2B employee, linking to user:', b2bEmployee);
        
        // Create or update user record with B2B employee link
        const { error: upsertError } = await supabase
          .from('users')
          .upsert({
            id: userId,
            user_type: 'employee',
            b2b_employee_id: b2bEmployee.id
          });

        if (upsertError) {
          console.error('Error linking user to B2B employee:', upsertError);
        } else {
          console.log('Successfully linked user to B2B employee');
          
          // Update B2B employee state to active
          await supabase
            .from('b2b_employees')
            .update({ state: 'active' })
            .eq('id', b2bEmployee.id);
        }
      }
    } catch (error) {
      console.error('Error in linkUserToB2BEmployee:', error);
    }
  };

  const loadUserRole = async (userId: string, userEmail?: string) => {
    try {
      // If we have an email, try to link to B2B employee first
      if (userEmail) {
        await linkUserToB2BEmployee(userEmail, userId);
      }

      const { data, error } = await supabase
        .from('users')
        .select('user_type, b2b_employee_id, hr_manager_id')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user role:', error);
        return;
      }

      if (data) {
        setUserRole(data as UserRole);
      } else {
        // If no user record exists, this might be a regular user
        console.log('No user role found, might be a regular user');
        setUserRole(null);
      }
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
          // Load user role after authentication with email for B2B linking
          setTimeout(() => {
            loadUserRole(session.user.id, session.user.email);
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
        loadUserRole(session.user.id, session.user.email);
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
