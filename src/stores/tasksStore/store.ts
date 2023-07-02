import { makeAutoObservable } from 'mobx'
import { clearPersistedStore, makePersistable } from 'mobx-persist-store'
import { type Task } from './types/Task'
import tasks from './tasks'

class TasksStore {
  public items: Task[] = tasks
  public activeTask: Task | null = tasks[0]
  public newTaskParent: Task[] | null = null

  public constructor () {
    makeAutoObservable(this)
    void makePersistable(this, {
      name: 'tasks',
      properties: ['items', 'activeTask', 'newTaskParent'],
      storage: window.localStorage
    })
  }

  // Обновляет поле найденной задачи и ее подзадач
  private recursiveSetTaskField<
    F extends keyof Task,
    V extends Task[F]
  > (taskId: string, field: F, value: V, onlyParents?: boolean): void {
    const recursiveSearch = (tasks: Task[]): void => {
      tasks.every((task) => {
        if (task.id === taskId) {
          task[field] = value

          const recursiveUpdate = (subtasks: Task[]): void => {
            subtasks.forEach((subtask, index) => {
              recursiveUpdate(subtask.subtasks)

              if (onlyParents === true && subtask.subtasks.length === 0) {
                return
              }

              subtasks[index] = { ...subtask, [field]: value }
            })
          }

          recursiveUpdate(task.subtasks)
          return false
        }

        recursiveSearch(task.subtasks)
        return true
      })
    }

    recursiveSearch(this.items)
  }

  // Обновляет поле всех существующих задач
  private recursiveSetField<
    F extends keyof Task,
    V extends Task[F]
  > (field: F, value: V): void {
    const recursiveUpdate = (tasks: Task[]): void => {
      tasks.forEach((task, index) => {
        tasks[index] = { ...task, [field]: value }
        recursiveUpdate(task.subtasks)
      })
    }

    recursiveUpdate(this.items)
  }

  public async clearPersistedStore (): Promise<void> {
    await clearPersistedStore(this)
  }

  public updateTask (taskId: string, newTask: Task): void {
    const recursiveUpdate = (tasks: Task[]): void => {
      tasks.every((task, index) => {
        if (task.id === taskId) {
          tasks[index] = newTask
          return false
        }

        recursiveUpdate(task.subtasks)
        return true
      })
    }

    recursiveUpdate(this.items)
  }

  public removeSelected (): void {
    const recursiveRemove = (tasks: Task[]): Task[] => {
      return tasks.filter((task) => {
        task.subtasks = recursiveRemove(task.subtasks)

        if (task.selected) {
          if (this.activeTask?.id === task.id) {
            this.activeTask = null
          }

          return false
        }

        return true
      })
    }

    this.items = recursiveRemove(this.items)
  }

  public setAllTasksSelected (selected: boolean): void {
    this.recursiveSetField('selected', selected)
  }

  public setAllTasksCollapsed (collapsed: boolean): void {
    this.recursiveSetField('collapsed', collapsed)
  }

  public setTaskSelected (taskId: string, selected: boolean): void {
    this.recursiveSetTaskField(taskId, 'selected', selected)
  }

  public setTaskCollapsed (taskId: string, collapsed: boolean): void {
    this.recursiveSetTaskField(taskId, 'collapsed', collapsed, true)
  }

  public setActiveTask (task: Task): void {
    this.activeTask = task
  }

  public setNewTaskParent (tasks: Task[] | null): void {
    this.newTaskParent = tasks
  }

  public createTask (task: Task): void {
    this.newTaskParent?.push(task)
  }
}

export default new TasksStore()
