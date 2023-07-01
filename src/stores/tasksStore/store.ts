import { makeAutoObservable } from 'mobx'
import { clearPersistedStore, makePersistable } from 'mobx-persist-store'
import { type Task } from './types/Task'
import initialTasks from './initialTasks'

class TasksStore {
  public items: Task[] = initialTasks
  public shownTask = initialTasks[0]

  public constructor () {
    makeAutoObservable(this)
    void makePersistable(this, {
      name: 'tasks',
      properties: ['items', 'shownTask'],
      storage: window.localStorage
    })
  }

  // Обновляет поле найденной задачи и ее подзадач
  private recursiveSetTaskField<
    F extends keyof Task,
    V extends Task[F]
  > (taskId: string, field: F, value: V): void {
    const recursiveSearch = (tasks: Task[]): void => {
      tasks.every((task) => {
        if (task.id === taskId) {
          task[field] = value

          const recursiveUpdate = (subtasks: Task[]): void => {
            subtasks.forEach((subtask, index) => {
              subtasks[index] = { ...subtask, [field]: value }
              recursiveUpdate(subtask.subtasks)
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

  public async clearMemory (): Promise<void> {
    await clearPersistedStore(this)
  }

  public showTask (task: Task): void {
    this.shownTask = task
  }

  public createTask (newTask: Task, parentId?: string): void {
    if (parentId == null) {
      this.items.push(newTask)
      return
    }

    const recursiveCreate = (tasks: Task[]): void => {
      tasks.every((task) => {
        if (task.id === parentId) {
          task.subtasks.push(newTask)
          return false
        }

        recursiveCreate(task.subtasks)
        return true
      })
    }

    recursiveCreate(this.items)
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
        if (task.selected) {
          return false
        }

        task.subtasks = recursiveRemove(task.subtasks)
        return true
      })
    }

    this.items = recursiveRemove(this.items)
  }

  public setTaskSelected (taskId: string, selected: boolean): void {
    this.recursiveSetTaskField(taskId, 'selected', selected)
  }

  public setTaskCollapsed (taskId: string, collapsed: boolean): void {
    this.recursiveSetTaskField(taskId, 'collapsed', collapsed)
  }
}

export default new TasksStore()
