import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, useStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type TTimeFilter = 'daily' | 'monthly'
export type TStatusFilter = 'active' | 'completed' | 'all'

interface PeriodFilterState {
  activeTimeFilter: TTimeFilter
  statusFilter: TStatusFilter
  setActiveTimeFilter: (filter: TTimeFilter) => void
  setStatusFilter: (filter: TStatusFilter) => void
}

const todoFilterStore = create(
  persist<PeriodFilterState>(
    (set) => ({
      activeTimeFilter: 'daily',
      statusFilter: 'all',
      setActiveTimeFilter: (filter: TTimeFilter) => {
        set(() => ({ activeTimeFilter: filter }))
      },
      setStatusFilter: (filter: TStatusFilter) => {
        set(() => ({ statusFilter: filter }))
      },
    }),
    {
      name: 'time-filter',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const useTodoFilterStore = () => useStore(todoFilterStore)
