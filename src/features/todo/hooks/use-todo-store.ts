import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, useStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ITodo {
  id: number
  task: string
  date: string
  completed: boolean
}

interface TodoState {
  todos: ITodo[]
  addTodo: (
    data: Pick<ITodo, 'task'> & { date: Date; time: Date | null },
  ) => void
}

const todoStore = create(
  persist<TodoState>(
    (set, get) => ({
      todos: [],
      addTodo: (data) => {
        let parsedDate = data.date
        if (data.time) {
          parsedDate.setHours(
            data.time.getHours(),
            data.time.getMinutes(),
            data.time.getSeconds(),
            data.time.getMilliseconds(),
          )
        }
        const newTodo = {
          id: Date.now(),
          task: data.task,
          date: parsedDate.toISOString(),
          completed: false,
        }
        set({ todos: [...get().todos, newTodo] })
      },
    }),
    {
      name: 'todos',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const useTodoStore = () => useStore(todoStore)
