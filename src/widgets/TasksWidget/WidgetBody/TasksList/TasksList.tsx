import React, { type ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import tasksStore, { type Task } from '../../../../stores/tasksStore'
import classes from './TasksList.module.scss'

const TasksList = observer(() => {
  const renderList = (tasks: Task[]): ReactElement | null => {
    if (tasks.length === 0) {
      return null
    }

    return (
      <ul className={classes.list}>
        {tasks.map((task) => {
          const selectButtonClasses = classNames({
            [classes.selectButton]: true,
            [classes.selectButtonActive]: task.id === tasksStore.shownTask.id
          })

          const handleCheckboxChange = (): void => {
            tasksStore.setTaskSelected(task.id, !task.selected)
          }

          const handleCollapse = (): void => {
            tasksStore.setTaskCollapsed(task.id, !task.collapsed)
          }

          const handleSelect = (): void => {
            tasksStore.showTask(task)
          }

          return (
            <li className={classes.listItem} key={task.id}>
              <div className={classes.listItemInfo}>
                <button className={classes.collapseButton} onClick={handleCollapse}>
                  <span>{task.collapsed ? '⇒' : '⇓'}</span>
                  <span className={classes.counter}>({task.subtasks.length})</span>
                </button>
                <button className={selectButtonClasses} onClick={handleSelect}>{task.title}</button>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  checked={task.selected}
                  onChange={handleCheckboxChange}
                />
              </div>
              {task.collapsed ? null : renderList(task.subtasks)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={classes.container}>
      {tasksStore.items.length > 0
        ? renderList(tasksStore.items)
        : <span>Задачи отсутствуют</span>}
    </div>
  )
})

export default TasksList
