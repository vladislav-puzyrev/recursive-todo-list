import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import tasks from './stores/tasks/index'

const App = observer(() => {
  useEffect(() => {
    tasks.removeSelected()
  }, [])

  return (
    <div>
      <p>App</p>
      <span>{tasks.items.length}</span>
    </div>
  )
})

export default App
