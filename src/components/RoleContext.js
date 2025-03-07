'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { DEFAULT_ROLE } from '../types/UserRoles';

// Create context with default values
export const RoleContext = createContext({
  role: DEFAULT_ROLE,
  loading: true,
  isAdmin: false
});

// Hook to use the role context
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    // Statt eines Fehlers geben wir Standardwerte zurück
    console.warn('useRole was used outside of a RoleProvider');
    return { role: DEFAULT_ROLE, loading: false, isAdmin: false };
  }
  return context;
};

// Provider component
export const RoleProvider = ({ children }) => {
  const supabase = createClientComponentClient();
  const [role, setRole] = useState(DEFAULT_ROLE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        console.log("User data:", user); // Debug-Ausgabe
        
        if (!user) {
          console.log("No user found, setting default role"); // Debug-Ausgabe
          setRole(DEFAULT_ROLE);
          setLoading(false);
          return;
        }
        
        // Get role from user metadata
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        console.log("Profile data:", data, "Error:", error); // Debug-Ausgabe
        
        if (error) {
          console.error('Error fetching user role:', error);
          setRole(DEFAULT_ROLE);
        } else {
          console.log("Setting role to:", data?.role || DEFAULT_ROLE); // Debug-Ausgabe
          setRole(data?.role || DEFAULT_ROLE);
        }
      } catch (error) {
        console.error('Unexpected error fetching role:', error);
        setRole(DEFAULT_ROLE);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const value = {
    role,
    loading,
    isAdmin: role === 'admin',
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};