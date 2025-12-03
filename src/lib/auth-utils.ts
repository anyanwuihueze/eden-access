import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export type UserRole = 'admin' | 'guard' | 'resident';

export async function getUserRole(uid: string): Promise<UserRole | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().role as UserRole;
    }
    return null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
}

export async function checkUserAccess(requiredRole: UserRole): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  
  const userRole = await getUserRole(user.uid);
  if (!userRole) return false;
  
  // Role hierarchy: admin > guard > resident
  const roleHierarchy = { admin: 3, guard: 2, resident: 1 };
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
