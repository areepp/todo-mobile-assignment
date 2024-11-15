import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, useStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type TTimeFilter = 'daily' | 'monthly'
export type TStatusFilter = 'active' | 'completed' | 'all'

interface PeriodFilterState {
  activeTimeFilter: TTimeFilter
  statusFilter: TStatusFilter
  activeDate: string
  setActiveTimeFilter: (filter: TTimeFilter) => void
  setStatusFilter: (filter: TStatusFilter) => void
  setActiveDate: (newDate: string) => void
}

const todoFilterStore = create(
  persist<PeriodFilterState>(
    (set) => ({
      activeTimeFilter: 'daily',
      statusFilter: 'all',
      activeDate: new Date().toISOString(),
      setActiveTimeFilter: (filter: TTimeFilter) => {
        set(() => ({ activeTimeFilter: filter }))
      },
      setStatusFilter: (filter: TStatusFilter) => {
        set(() => ({ statusFilter: filter }))
      },
      setActiveDate: (newDate: string) => set(() => ({ activeDate: newDate })),
    }),
    {
      name: 'time-filter',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const useTodoFilterStore = () => useStore(todoFilterStore)
