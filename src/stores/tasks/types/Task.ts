export interface Task {
  id: string
  title: string
  description: string
  selected: boolean
  collapsed: boolean
  subtasks: Task[]
}
