import React from 'react'
import { observer } from 'mobx-react-lite'
import NewTaskForm from './NewTaskForm'
import TasksList from './TasksList'
import TaskInfo from './TaskInfo'
import tasksStore from '../../../stores/tasksStore'
import classes from './WidgetBody.module.scss'

const WidgetBody = observer(() => {
  return (
    <div className={classes.body}>
      <div className={classes.left}>
        {(tasksStore.newTaskParent == null) ? <TasksList/> : <NewTaskForm/>}
      </div>
      <div className={classes.right}>
        <TaskInfo/>
      </div>
    </div>
  )
})

export default WidgetBody
