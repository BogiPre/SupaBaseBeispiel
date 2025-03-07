'use client';

import { useRole } from './RoleContext';
import Navigation from './Navigation';

export default function NavigationWrapper() {
  // Stelle sicher, dass dieser Hook nur ausgeführt wird, wenn der RoleProvider verfügbar ist
  const { isAdmin, loading } = useRole();
  
  return <Navigation isAdmin={isAdmin} loading={loading} />;
}