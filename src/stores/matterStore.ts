import { create } from 'zustand';

/**
 * MatterStore: ZERO-PERSISTENCE IN-MEMORY STORE.
 * NEVER saved to localStorage or indexedDB to guarantee confidentiality.
 */
interface MatterStore {
  matterValues: Record<string, Record<string, any>>; // skillId -> { varKey: val }
  confidentialityAccepted: Record<string, boolean>; // skillId -> boolean
  setVariableValue: (skillId: string, key: string, value: any) => void;
  resetSkillVariables: (skillId: string) => void;
  setConfidentialityAccepted: (skillId: string, accepted: boolean) => void;
  clearAllMatterData: () => void;
}

export const useMatterStore = create<MatterStore>((set) => ({
  matterValues: {},
  confidentialityAccepted: {},

  setVariableValue: (skillId, key, value) => set((state) => ({
    matterValues: {
      ...state.matterValues,
      [skillId]: {
        ...(state.matterValues[skillId] || {}),
        [key]: value
      }
    }
  })),

  resetSkillVariables: (skillId) => set((state) => {
    const updated = { ...state.matterValues };
    delete updated[skillId];
    return { matterValues: updated };
  }),

  setConfidentialityAccepted: (skillId, accepted) => set((state) => ({
    confidentialityAccepted: {
      ...state.confidentialityAccepted,
      [skillId]: accepted
    }
  })),

  clearAllMatterData: () => set({ matterValues: {}, confidentialityAccepted: {} })
}));
