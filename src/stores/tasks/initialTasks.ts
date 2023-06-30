import { nanoid } from 'nanoid'
import { type Task } from './types/Task'

const initialTasks: Task[] = [
  {
    id: nanoid(),
    title: 'Задача 1',
    description: 'Описание 1',
    selected: true,
    collapsed: true,
    subtasks: []
  },
  {
    id: nanoid(),
    title: 'Задача 2',
    description: 'Описание 2',
    selected: false,
    collapsed: true,
    subtasks: []
  },
  {
    id: nanoid(),
    title: 'Задача 3',
    description: 'Описание 3',
    selected: false,
    collapsed: true,
    subtasks: [
      {
        id: nanoid(),
        title: 'Задача 3.1',
        description: 'Описание 3.1',
        selected: false,
        collapsed: true,
        subtasks: []
      },
      {
        id: nanoid(),
        title: 'Задача 3.2',
        description: 'Описание 3.2',
        selected: false,
        collapsed: true,
        subtasks: []
      },
      {
        id: nanoid(),
        title: 'Задача 3.3',
        description: 'Описание 3.3',
        selected: false,
        collapsed: true,
        subtasks: [
          {
            id: nanoid(),
            title: 'Задача 3.3.1',
            description: 'Описание 3.3.1',
            selected: false,
            collapsed: true,
            subtasks: []
          },
          {
            id: nanoid(),
            title: 'Задача 3.3.2',
            description: 'Описание 3.3.2',
            selected: false,
            collapsed: true,
            subtasks: []
          }
        ]
      }
    ]
  },
  {
    id: nanoid(),
    title: 'Задача 4',
    description: 'Описание 4',
    selected: false,
    collapsed: true,
    subtasks: []
  },
  {
    id: nanoid(),
    title: 'Задача 5',
    description: 'Описание 5',
    selected: false,
    collapsed: true,
    subtasks: []
  }
]

export default initialTasks
