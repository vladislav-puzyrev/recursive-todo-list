import React, { type ReactElement } from 'react'
import TasksList from './TasksList'
import TaskInfo from './TaskInfo'
import classes from './WidgetBody.module.scss'

const WidgetBody = (): ReactElement => {
  return (
    <div className={classes.body}>
      <div className={classes.left}>
        <TasksList/>
      </div>
      <div className={classes.right}>
        <TaskInfo/>
      </div>
    </div>
  )
}

export default WidgetBody
