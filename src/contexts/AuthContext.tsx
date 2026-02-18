import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  user_id: string;
  user_type: "b2c" | "b2b";
  full_name: string | null;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  industry: string | null;
  job_title: string | null;
  company_size: string | null;
  lead_status: string | null;
}

// Demo user profiles
const DEMO_PROFILES: Record<string, { user: Partial<User>; profile: Profile }> = {
  b2c: {
    user: {
      id: "demo-b2c-user-001",
      email: "priya@example.com",
      user_metadata: { full_name: "Priya Sharma", user_type: "b2c" },
    },
    profile: {
      id: "demo-profile-b2c-001",
      user_id: "demo-b2c-user-001",
      user_type: "b2c",
      full_name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 12345",
      company_name: null,
      industry: null,
      job_title: null,
      company_size: null,
      lead_status: null,
    },
  },
  b2b: {
    user: {
      id: "demo-b2b-user-001",
      email: "rahul@luxehotels.com",
      user_metadata: {
        full_name: "Rahul Mehta",
        user_type: "b2b",
        company_name: "Luxe Hotels Group",
        industry: "Hospitality",
        job_title: "VP Operations",
        company_size: "201–1000 employees",
      },
    },
    profile: {
      id: "demo-profile-b2b-001",
      user_id: "demo-b2b-user-001",
      user_type: "b2b",
      full_name: "Rahul Mehta",
      email: "rahul@luxehotels.com",
      phone: "+91 98765 67890",
      company_name: "Luxe Hotels Group",
      industry: "Hospitality",
      job_title: "VP Operations",
      company_size: "201–1000 employees",
      lead_status: "qualified",
    },
  },
};

const DEMO_STORAGE_KEY = "eze-demo-session";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isDemo: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  demoLogin: (type: "b2c" | "b2b") => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  isDemo: false,
  signOut: async () => { },
  refreshProfile: async () => { },
  demoLogin: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  // Use a ref so onAuthStateChange always reads the latest value
  const isDemoRef = useRef(false);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setProfile(data as Profile | null);
  };

  const refreshProfile = async () => {
    if (user && !isDemoRef.current) await fetchProfile(user.id);
  };

  const demoLogin = useCallback((type: "b2c" | "b2b") => {
    const demo = DEMO_PROFILES[type];
    setUser(demo.user as User);
    setProfile(demo.profile);
    setIsDemo(true);
    isDemoRef.current = true;
    setSession({} as Session); // truthy so guards pass
    setLoading(false);

    // Persist to sessionStorage so refresh doesn't wipe it
    try {
      sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify({ type }));
    } catch { /* private browsing — ignore */ }
  }, []);

  // On mount: check for persisted demo session first, then Supabase
  useEffect(() => {
    // 1. Check for persisted demo
    try {
      const stored = sessionStorage.getItem(DEMO_STORAGE_KEY);
      if (stored) {
        const { type } = JSON.parse(stored) as { type: "b2c" | "b2b" };
        const demo = DEMO_PROFILES[type];
        if (demo) {
          setUser(demo.user as User);
          setProfile(demo.profile);
          setSession({} as Session);
          setIsDemo(true);
          isDemoRef.current = true;
          setLoading(false);
          return; // don't bother with Supabase
        }
      }
    } catch { /* no stored demo */ }

    // 2. Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id).finally(() => setLoading(false));
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Guard: never clobber an active demo session
      if (isDemoRef.current) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (isDemoRef.current) {
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsDemo(false);
      isDemoRef.current = false;
      try { sessionStorage.removeItem(DEMO_STORAGE_KEY); } catch { }
      return;
    }
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, isDemo, signOut, refreshProfile, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
