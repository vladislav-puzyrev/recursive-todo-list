import { makeAutoObservable } from 'mobx'
import { type Task } from './types/Task'
import initialTasks from './initialTasks'

class Tasks {
  public items: Task[] = initialTasks

  public constructor () {
    makeAutoObservable(this)
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

          const recursiveUpdate = (tasks: Task[]): Task[] => {
            return tasks.map((task) => {
              recursiveUpdate(task.subtasks)
              return { ...task, [field]: value }
            })
          }

          task.subtasks = recursiveUpdate(task.subtasks)
          return false
        }

        recursiveSearch(task.subtasks)
        return true
      })
    }

    recursiveSearch(this.items)
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

  public selectTask (taskId: string): void {
    this.recursiveSetTaskField(taskId, 'selected', true)
  }

  public unselectTask (taskId: string): void {
    this.recursiveSetTaskField(taskId, 'selected', false)
  }

  public collapseTask (taskId: string): void {
    this.recursiveSetTaskField(taskId, 'collapsed', true)
  }

  public expandTask (taskId: string): void {
    this.recursiveSetTaskField(taskId, 'collapsed', false)
  }
}

export default new Tasks()
