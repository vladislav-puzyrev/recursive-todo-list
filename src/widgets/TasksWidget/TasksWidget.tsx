import React, { type ReactElement } from 'react'
import WidgetHeader from './WidgetHeader'
import WidgetBody from './WidgetBody'
import classes from './TasksWidget.module.scss'

const TasksWidget = (): ReactElement => {
  return (
    <div className={classes.widget}>
      <WidgetHeader/>
      <WidgetBody/>
    </div>
  )
}

export default TasksWidget
