import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (user: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: "",
  // login: (username) => set((store) => ({ user: username })), since we are not using the current state of the store,
  // we can remove the store parameter:
  login: (username) => set(() => ({ user: username })),
  logout: () => set(() => ({ user: "" })),
}));

export default useAuthStore;
