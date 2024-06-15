import { create } from "zustand";

export type ConfigType = {
  numberOfQuestion: number;
  category: { id: number; name: string };
  level: string;
  type: string;
  status: string;
  score: number;
};

const defaultConfig: ConfigType = {
  numberOfQuestion: 10,
  category: {
    id: 0,
    name: "",
  },
  type: "",
  status: "",
  score: 0,
  level: "",
};

export type UserQuizType = {
  config: ConfigType;
  addLevel: (level: string) => void;
  addType: (type: string) => void;
  addNumberOfQuestions: (count: number) => void;
  addCategory: (id: number, name: string) => void;
  addStatus: (status: string) => void;
  addScore: (score: number) => void;
};

const userQuiz = create<UserQuizType>((set) => ({
  config: { ...defaultConfig },

  addLevel: (level: string) =>
    set((state) => ({ config: { ...state.config, level: level } })),

  addType: (type: string) =>
    set((state) => ({ config: { ...state.config, type: type } })),

  addNumberOfQuestions: (count: number) =>
    set((state) => ({ config: { ...state.config, numberOfQuestion: count } })),

  addCategory: (id: number, name: string) =>
    set((state) => ({
      config: { ...state.config, category: { id: id, name: name } },
    })),

  addStatus: (status: string) =>
    set((state) => ({ config: { ...state.config, status: status } })),

  addScore: (score: number) =>
    set((state) => ({
      config: { ...state.config, score: state.config.score + 1 },
    })),

  // removeAllBears: () => set({ bears: 0 }),
}));

export default userQuiz;
