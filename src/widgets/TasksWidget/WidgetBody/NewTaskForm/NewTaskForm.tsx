import React, { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import tasksStore from '../../../../stores/tasksStore'
import classes from './NewTaskForm.module.scss'
import { type Task } from './types/Task'

const NewTaskForm = (): ReactElement => {
  const { register, handleSubmit, formState: { errors } } = useForm<Task>()

  const handleCancel = (): void => {
    tasksStore.setNewTaskParent(null)
  }

  const onSubmit = (task: Task): void => {
    tasksStore.createTask({
      id: nanoid(),
      title: task.title,
      description: task.description,
      selected: false,
      collapsed: true,
      subtasks: []
    })
    handleCancel()
  }

  const isEmpty = (string: string): boolean => {
    return string.trim() !== ''
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Заголовок" {...register('title', { required: true, validate: isEmpty })} />
      <textarea placeholder="Описание" {...register('description', { required: true, validate: isEmpty })} rows={4}/>
      <input className={classes.submit} type="submit" value="Создать"/>
      <button className={classes.cancel} onClick={handleCancel}>Отменить</button>
      {(errors.title != null) ? <span>Заголовок обязателен</span> : null}
      {(errors.description != null) ? <span>Описание обязательно</span> : null}
    </form>
  )
}

export default NewTaskForm
