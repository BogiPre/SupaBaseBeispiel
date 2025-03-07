'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from './RoleContext';
import Loading from '../app/loading';

const AdminGuard = ({ children }) => {
  const { isAdmin, loading } = useRole();
  const router = useRouter();

  useEffect(() => {
    // Nur weiterleiten, wenn das Laden abgeschlossen ist und wir wissen, dass der Benutzer kein Admin ist
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, loading, router]);

  // Zeige Ladeindikator während der Rollenprüfung
  if (loading) {
    return <Loading />;
  }

  // Rendere Kinder nur, wenn der Benutzer ein Admin ist
  return isAdmin ? children : null;
};

export default AdminGuard;