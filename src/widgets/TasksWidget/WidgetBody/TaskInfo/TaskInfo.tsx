import React from 'react'
import { observer } from 'mobx-react-lite'
import tasksStore from '../../../../stores/tasksStore'
import classes from './TaskInfo.module.scss'

const TaskInfo = observer(() => {
  return (
    <div className={classes.info}>
      <span className={classes.title}>{tasksStore.shownTask.title}</span>
      <span className={classes.description}>{tasksStore.shownTask.description}</span>
    </div>
  )
})

export default TaskInfo
