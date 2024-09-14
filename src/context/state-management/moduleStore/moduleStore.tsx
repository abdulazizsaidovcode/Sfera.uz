import { create } from 'zustand';

// Define the type for the store's state
interface ModuleState {
  ModuleData: any;
  setModuleData: (data: any) => void;
  CategoryId: any;
  setCategoryId: (data: any) => void;
  VedioLink: string | null;
  setVedioLink: (data: string | null) => void;
}

// Create the store
const ModuleStore = create<ModuleState>((set) => ({
  ModuleData: JSON.parse(localStorage.getItem('ModuleData') || 'null'),
  setModuleData: (data) => {
    set({ ModuleData: data });
    localStorage.setItem('ModuleData', JSON.stringify(data));
  },
  CategoryId: JSON.parse(localStorage.getItem('CategoryId') || 'null'),
  setCategoryId: (data) => {
    set({ CategoryId: data });
    localStorage.setItem('CategoryId', JSON.stringify(data));
  },
  VedioLink: JSON.parse(localStorage.getItem('VedioLink') || 'null'),
  setVedioLink: (data) => {
    set({ VedioLink: data });
    localStorage.setItem('VedioLink', JSON.stringify(data));
  }
}));

export default ModuleStore;
