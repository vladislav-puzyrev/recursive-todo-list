import React from 'react'
import { observer } from 'mobx-react-lite'
import tasksStore from '../../../../stores/tasksStore'
import classes from './TaskInfo.module.scss'

const TaskInfo = observer(() => {
  if (tasksStore.activeTask == null) {
    return <span>Активная задача отсутствует</span>
  }

  return (
    <div className={classes.info}>
      <span className={classes.title}>{tasksStore.activeTask.title}</span>
      <span className={classes.description}>{tasksStore.activeTask.description}</span>
    </div>
  )
})

export default TaskInfo
