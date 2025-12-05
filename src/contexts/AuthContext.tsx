import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from '@/lib/firebase';

interface UserProfile {
  email: string;
  name: string;
  selectedCity: string;
  preferences: {
    notifications: boolean;
    calculationMethod: string;
  };
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const profileDoc = await getDoc(doc(db, 'users', user.uid));
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data() as UserProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createUserProfile = async (user: User, name?: string) => {
    const profile: UserProfile = {
      email: user.email || '',
      name: name || user.displayName || 'User',
      selectedCity: 'mecca',
      preferences: {
        notifications: true,
        calculationMethod: 'MWL',
      },
    };
    await setDoc(doc(db, 'users', user.uid), profile);
    setUserProfile(profile);
  };

  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const profileDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!profileDoc.exists()) {
      await createUserProfile(result.user);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    await createUserProfile(result.user, name);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const profileDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!profileDoc.exists()) {
      await createUserProfile(result.user);
    }
  };

  const signInWithFacebook = async () => {
    const result = await signInWithPopup(auth, facebookProvider);
    const profileDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!profileDoc.exists()) {
      await createUserProfile(result.user);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updatedProfile = { ...userProfile, ...data } as UserProfile;
    await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
    setUserProfile(updatedProfile);
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signInWithFacebook,
      logout,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
