import React, { type ReactElement } from 'react'
import tasksStore from '../../../stores/tasksStore'
import classes from './WidgetHeader.module.scss'

const WidgetHeader = (): ReactElement => {
  const handleSelectAll = (): void => {
    tasksStore.setAllTasksSelected(true)
  }

  const handleUnselectAll = (): void => {
    tasksStore.setAllTasksSelected(false)
  }

  const handleCollapseAll = (): void => {
    tasksStore.setAllTasksCollapsed(true)
  }

  const handleExpandAll = (): void => {
    tasksStore.setAllTasksCollapsed(false)
  }

  const handleRemove = (): void => {
    tasksStore.removeSelected()
  }

  const handleClear = async (): Promise<void> => {
    await tasksStore.clearPersistedStore()
    location.reload()
  }

  return (
    <div className={classes.header}>
      <button onClick={handleSelectAll}>Выбрать все</button>
      <button onClick={handleUnselectAll}>Отменить все</button>
      <button onClick={handleExpandAll}>Развернуть все</button>
      <button onClick={handleCollapseAll}>Свернуть все</button>
      <button onClick={handleRemove}>Удалить выбранные</button>
      <button onClick={handleClear}>Очистить память</button>
    </div>
  )
}

export default WidgetHeader
