"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { RecyclingCollectionPoint } from "@/lib/csdi/types";

export type MemberOrder = {
  id: string;
  date: string;
  items: string;
  total: number;
  status: "Delivered" | "Processing" | "Shipped";
};

export type BookmarkedPoint = {
  cp_id: string;
  address: string;
  district: string | null;
  wasteTypes: string | null;
  savedAt: string;
};

export type EventReminder = {
  id: string;
  title: string;
  date: string;
  notes: string;
};

export type Member = {
  email: string;
};

type AuthContextValue = {
  member: Member | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  orders: MemberOrder[];
  bookmarks: BookmarkedPoint[];
  reminders: EventReminder[];
  addBookmark: (point: RecyclingCollectionPoint, address: string) => void;
  removeBookmark: (cpId: string) => void;
  isBookmarked: (cpId: string) => boolean;
  addReminder: (title: string, date: string, notes: string) => void;
  removeReminder: (id: string) => void;
  addOrder: (order: Omit<MemberOrder, "id">) => void;
};

const SESSION_KEY = "wfep-member-session";
const ACCOUNTS_KEY = "wfep-member-accounts";
const ORDERS_KEY = "wfep-member-orders";
const BOOKMARKS_KEY = "wfep-member-bookmarks";
const REMINDERS_KEY = "wfep-member-reminders";

type StoredAccounts = Record<string, string>;

function loadSession(): Member | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Member;
  } catch {
    return null;
  }
}

function loadAccounts(): StoredAccounts {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StoredAccounts;
  } catch {
    return {};
  }
}

function loadMemberData<T>(key: string, email: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const all = JSON.parse(raw) as Record<string, T>;
    return all[email] ?? fallback;
  } catch {
    return fallback;
  }
}

function saveMemberData<T>(key: string, email: string, data: T) {
  const raw = localStorage.getItem(key);
  const all = raw ? (JSON.parse(raw) as Record<string, T>) : {};
  all[email] = data;
  localStorage.setItem(key, JSON.stringify(all));
}

function seedDemoOrders(email: string): MemberOrder[] {
  return [
    {
      id: "ORD-10042",
      date: "2025-11-18",
      items: "Calmexa XR × 1",
      total: 49.99,
      status: "Delivered",
    },
    {
      id: "ORD-10038",
      date: "2025-09-02",
      items: "Calmexa XR × 2 (subscription)",
      total: 84.98,
      status: "Delivered",
    },
  ];
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [ready, setReady] = useState(false);
  const [orders, setOrders] = useState<MemberOrder[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkedPoint[]>([]);
  const [reminders, setReminders] = useState<EventReminder[]>([]);

  const loadMemberState = useCallback((email: string) => {
    let memberOrders = loadMemberData<MemberOrder[]>(ORDERS_KEY, email, []);
    if (memberOrders.length === 0) {
      memberOrders = seedDemoOrders(email);
      saveMemberData(ORDERS_KEY, email, memberOrders);
    }
    setOrders(memberOrders);
    setBookmarks(loadMemberData<BookmarkedPoint[]>(BOOKMARKS_KEY, email, []));
    setReminders(loadMemberData<EventReminder[]>(REMINDERS_KEY, email, []));
  }, []);

  useEffect(() => {
    const session = loadSession();
    if (session) {
      setMember(session);
      loadMemberState(session.email);
    }
    setReady(true);
  }, [loadMemberState]);

  const login = useCallback(
    async (email: string, password: string) => {
      const normalized = email.trim().toLowerCase();
      if (!normalized || !password) {
        return { ok: false, error: "Email and password are required." };
      }

      const accounts = loadAccounts();
      if (!accounts[normalized]) {
        return { ok: false, error: "No account found. Please sign up first." };
      }
      if (accounts[normalized] !== password) {
        return { ok: false, error: "Incorrect password." };
      }

      const session = { email: normalized };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setMember(session);
      loadMemberState(normalized);
      return { ok: true };
    },
    [loadMemberState],
  );

  const signup = useCallback(
    async (email: string, password: string) => {
      const normalized = email.trim().toLowerCase();
      if (!normalized || !password) {
        return { ok: false, error: "Email and password are required." };
      }
      if (password.length < 6) {
        return { ok: false, error: "Password must be at least 6 characters." };
      }

      const accounts = loadAccounts();
      if (accounts[normalized]) {
        return { ok: false, error: "An account with this email already exists. Please log in." };
      }

      accounts[normalized] = password;
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

      const session = { email: normalized };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setMember(session);
      loadMemberState(normalized);
      return { ok: true };
    },
    [loadMemberState],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setMember(null);
    setOrders([]);
    setBookmarks([]);
    setReminders([]);
  }, []);

  const addBookmark = useCallback(
    (point: RecyclingCollectionPoint, address: string) => {
      if (!member) return;
      const next = [
        ...bookmarks.filter((b) => b.cp_id !== point.cp_id),
        {
          cp_id: point.cp_id,
          address,
          district: point.district_id,
          wasteTypes: point.waste_type,
          savedAt: new Date().toISOString(),
        },
      ];
      setBookmarks(next);
      saveMemberData(BOOKMARKS_KEY, member.email, next);
    },
    [member, bookmarks],
  );

  const removeBookmark = useCallback(
    (cpId: string) => {
      if (!member) return;
      const next = bookmarks.filter((b) => b.cp_id !== cpId);
      setBookmarks(next);
      saveMemberData(BOOKMARKS_KEY, member.email, next);
    },
    [member, bookmarks],
  );

  const isBookmarked = useCallback(
    (cpId: string) => bookmarks.some((b) => b.cp_id === cpId),
    [bookmarks],
  );

  const addReminder = useCallback(
    (title: string, date: string, notes: string) => {
      if (!member) return;
      const next = [
        ...reminders,
        { id: crypto.randomUUID(), title, date, notes },
      ].sort((a, b) => a.date.localeCompare(b.date));
      setReminders(next);
      saveMemberData(REMINDERS_KEY, member.email, next);
    },
    [member, reminders],
  );

  const removeReminder = useCallback(
    (id: string) => {
      if (!member) return;
      const next = reminders.filter((r) => r.id !== id);
      setReminders(next);
      saveMemberData(REMINDERS_KEY, member.email, next);
    },
    [member, reminders],
  );

  const addOrder = useCallback(
    (order: Omit<MemberOrder, "id">) => {
      if (!member) return;
      const next = [
        { ...order, id: `ORD-${Date.now().toString().slice(-6)}` },
        ...orders,
      ];
      setOrders(next);
      saveMemberData(ORDERS_KEY, member.email, next);
    },
    [member, orders],
  );

  return (
    <AuthContext.Provider
      value={{
        member,
        ready,
        login,
        signup,
        logout,
        orders,
        bookmarks,
        reminders,
        addBookmark,
        removeBookmark,
        isBookmarked,
        addReminder,
        removeReminder,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
