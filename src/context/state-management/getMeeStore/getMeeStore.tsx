import { create } from 'zustand';

// Define the type for the store's state
interface MeeState {
  getMeeData: any;
  setGetMeeData: (data: any) => void;
}

// Create the store
const useMeeStore = create<MeeState>((set) => ({
    getMeeData: null,
    setGetMeeData: (data) => set({getMeeData: data})
}));

export default useMeeStore;
