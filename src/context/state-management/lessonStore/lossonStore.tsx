import { create } from 'zustand';

interface LessonStore {
  selectedLessonId: number | null;
  setSelectedLessonId: (id: number) => void;
}

export const useLessonStore = create<LessonStore>((set) => ({
  selectedLessonId: null,
  setSelectedLessonId: (id) => set({ selectedLessonId: id }),
}));
