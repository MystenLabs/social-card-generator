'use client';

import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultCardData = {
  name: '',
  username: '',
  image: '',
  template: 'bg1' as 'bg1' | 'bg2' | 'bg3',
};

export interface ICardStore {
  status: 'waiting' | 'ready';
  state: typeof defaultCardData;
  setState: React.Dispatch<React.SetStateAction<typeof defaultCardData>>;
}

const useBaseCardStore = create<ICardStore>()(
  persist(
    (set) => ({
      status: 'waiting',
      state: defaultCardData,
      setState: (data) => set((previous) => ({ state: { ...previous.state, ...data } })),
    }),
    {
      name: 'card-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.status = 'ready';
      },
    }
  )
);

export const useCardStore = createSelectorFunctions(useBaseCardStore);
