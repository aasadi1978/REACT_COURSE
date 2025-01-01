// Define the shape of the store

import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface CounterStore {
  counter: number;
  increment: () => void;
  reset: () => void;
}

// Use the create function from zustand and pass the shape of the store, i.e., CounterState
// The create function returns a custom hook that we can use to access the store
// We call this function and give it an arrow function that takes a set function as an argument which is a function for updating the store
// The arrow function returns an object with the initial state of the store. In this object, we define the implementation of the increment
// and reset functions. The increment function increments the counter by 1, and the reset function sets the counter to 0. The increment
// function is an arrow function with no parameter that that uses the set function to update the store. The set function takes a callback
// function that receives the current state of the store and returns the new state of the store.
const useCounterStore = create<CounterStore>((set) => ({
  counter: 0,
  increment: () => set((store) => ({ counter: store.counter + 1 })),
  //   reset: () => set(store => { counter: 0 }), since we are not using the current state of the store, we can remove the store parameter:
  reset: () => set({ counter: 0 }),
}));

// To prevent TypeScript compilation error when using process.env.NODE_ENV, we have to install
// the types for Node.js which is development base requirement (not required for production). It can be
// installed using the following command: npm install -D @types/node
if (process.env.NODE_ENV === "development") {
  // The mountStoreDevtool function is used to mount the store devtools to the store. It takes two arguments:
  // 1. The name of the store, which is used to identify the store in the devtools.
  // 2. The store object, which is the store returned by the useStore hook.
  mountStoreDevtool("Counter Store", useCounterStore);
}

export default useCounterStore;
