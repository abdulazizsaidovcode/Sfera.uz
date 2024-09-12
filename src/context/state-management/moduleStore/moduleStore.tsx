import { create } from 'zustand';

// Define the type for the store's state
interface ModuleState {
  ModuleData: any;
  setModuleData: (data: any) => void;
  CategoryId: string;
  setCategoryId: (data: string) => void;
}

// Create the store
const ModuleStore = create<ModuleState>((set) => ({
    ModuleData: null,
    setModuleData: (data) => set({ModuleData: data}),
    CategoryId: '',
    setCategoryId: (data) => set({CategoryId: data})
}));

export default ModuleStore;
