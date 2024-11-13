import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, useStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import * as Notifications from 'expo-notifications'

export interface ITodo {
  id: number
  task: string
  date: string
  time?: string
  completed: boolean
}

interface TodoState {
  todos: ITodo[]
  addTodo: (
    data: Pick<ITodo, 'task'> & { date: Date; time: Date | null },
  ) => void
  deleteTodo: (id: number) => void
  toggleCompleted: (id: number) => void
}

const todoStore = create(
  persist<TodoState>(
    (set) => ({
      todos: [],
      addTodo: async (data) => {
        let parsedDate = data.date
        if (data.time) {
          parsedDate.setHours(
            data.time.getHours(),
            data.time.getMinutes(),
            data.time.getSeconds(),
            data.time.getMilliseconds(),
          )
          const triggerDate = new Date(parsedDate.getTime() - 5 * 60 * 1000)

          // Schedule the notification
          // temporary implementation. Should be set from some kind of background task or cron job instead and check whether the task is completed or not.
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Upcoming Task',
              body: `Your task "${data.task}" is due in 5 minutes.`,
            },
            trigger: {
              date: triggerDate,
            },
          })
        }

        const newTodo = {
          id: Date.now(),
          task: data.task,
          date: data.date.toISOString(),
          completed: false,
          ...(data.time ? { time: data.time?.toISOString() } : {}),
        }
        set((state) => ({ todos: [...state.todos, newTodo] }))
      },
      deleteTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))
      },
      toggleCompleted: (id: number) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),
    }),
    {
      name: 'todos',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const useTodoStore = () => useStore(todoStore)
