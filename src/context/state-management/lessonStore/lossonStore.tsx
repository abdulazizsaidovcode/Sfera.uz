import create from 'zustand';

interface LessonStore {
  selectedLessonId: number;
  setSelectedLessonId: (id: number) => void;
  questionData: any;
  setquestionData: (id: any) => void;
}

export const useLessonStore = create<LessonStore>((set) => ({
  selectedLessonId: 0,
  setSelectedLessonId: (id) => set({ selectedLessonId: id }),
  questionData: [],
  setquestionData: (id) => set({ questionData: id }),
}));
