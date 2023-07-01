import React, { type ReactElement } from 'react'
import tasksStore from '../../../stores/tasksStore'
import classes from './WidgetHeader.module.scss'

const WidgetHeader = (): ReactElement => {
  const handleRemove = (): void => {
    tasksStore.removeSelected()
  }

  const handleClear = async (): Promise<void> => {
    await tasksStore.clearMemory()
    location.reload()
  }

  return (
    <div className={classes.header}>
      <button className={classes.remove} onClick={handleRemove}>Удалить выбранные</button>
      <button className={classes.clear} onClick={() => { void handleClear() }}>Очистить память</button>
    </div>
  )
}

export default WidgetHeader
