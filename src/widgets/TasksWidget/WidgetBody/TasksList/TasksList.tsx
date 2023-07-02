import React, { type ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import tasksStore, { type Task } from '../../../../stores/tasksStore'
import classes from './TasksList.module.scss'

const TasksList = observer(() => {
  const renderList = (tasks: Task[]): ReactElement => {
    const handleNewTask = (): void => {
      tasksStore.setNewTaskParent(tasks)
    }

    if (tasks.length === 0) {
      return <button className={classes.newTask} onClick={handleNewTask}>Создать вложенную</button>
    }

    return (
      <div className={classes.tasks}>
        <ul className={classes.list}>
          {tasks.map((task) => {
            const titleClasses = classNames({
              [classes.title]: true,
              [classes.titleActive]: task.id === tasksStore.activeTask?.id
            })

            const handleSelect = (): void => {
              tasksStore.setTaskSelected(task.id, !task.selected)
            }

            const handleCollapse = (): void => {
              tasksStore.setTaskCollapsed(task.id, !task.collapsed)
            }

            const handleActive = (): void => {
              tasksStore.setActiveTask(task)
            }

            return (
              <li className={classes.listItem} key={task.id}>
                <div className={classes.listItemInfo}>
                  <button className={classes.collapse} onClick={handleCollapse}>
                    <span>{task.collapsed ? '⇒' : '⇓'}</span>
                    <span className={classes.counter}>({task.subtasks.length})</span>
                  </button>
                  <button className={titleClasses} onClick={handleActive}>{task.title}</button>
                  <input
                    className={classes.checkbox}
                    aria-label="Select"
                    type="checkbox"
                    checked={task.selected}
                    onChange={handleSelect}
                  />
                </div>
                {task.collapsed ? null : renderList(task.subtasks)}
              </li>
            )
          })}
        </ul>
        <button className={classes.addTask} onClick={handleNewTask}>Добавить в конец</button>
      </div>
    )
  }

  return renderList(tasksStore.items)
})

export default TasksList
