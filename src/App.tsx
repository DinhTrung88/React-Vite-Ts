import { useState, useEffect, useRef } from 'react'
import { RefObject, LegacyRef, MutableRefObject } from 'react'
import './index.scss'
import Input from './components/Input'
import Display from './components/Display'
import { Job } from './components/Display'
import { getApi } from './components/callApi'
function App() {
  const [job, setJob] = useState<string>('')
  const [jobList, setJobList] = useState<Job[]>([])
  const [saveId, setSaveId] = useState<number>()
  const inputRef: RefObject<HTMLInputElement> = useRef(null)
  useEffect(() => {
    const res = getApi()
    res.then((data) => setJobList(data))
  }, [])
  const handleAdd = () => {
    if (!job) return
    const newJob: Job = {
      content: job,
    }
    fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: job }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedjobList = [...jobList, { ...newJob, id: data.id }]
        setJobList(updatedjobList)
      })
      .catch((error) => {
        console.error('Error adding job:', error)
      })

    setJob('')
    console.log(inputRef.current)

    if (!inputRef.current) return
    inputRef.current.focus()
  }

  const handleRemove = async (id: number | undefined) => {
    if (!id) return
    try {
      await fetch(`http://localhost:8000/posts/${id}`, {
        method: 'DELETE',
      })
      const updatedjobList = jobList.filter((job) => job.id !== id)

      setJobList(updatedjobList)
    } catch (error) {
      console.error('Error removing job:', error)
    }
    if (!inputRef.current) return
    inputRef.current.focus()
  }
  const onEdit = (id: number | undefined) => {
    setSaveId(id)
    let find = jobList.find((job) => job.id === id)
    setJob(find?.content ?? '')
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  const handleEdit = async () => {
    if (job === '' || saveId === undefined) return
    let res = await fetch(`http://localhost:8000/posts/${saveId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: job }),
    })
      .then((response) => response.json())
      .then((data) => {
        let find = jobList.findIndex((job) => job.id == saveId)
        const updatejobList = [...jobList]
        updatejobList[find] = { content: job, id: data.id }
        setJobList(updatejobList)
        setJob('')
      })
    setSaveId(undefined)
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  const handleSetJob = (job: string) => setJob(job)

  return (
    <div className="app">
      <div className="app_list">
        <h1>TODO LIST</h1>
        <div className="content">
          <Input handleSetJob={handleSetJob} job={job} inputRef={inputRef} />
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
        <div id="list-container">
          {jobList.map((job) => (
            <Display key={job.id} job={job} onEdit={onEdit} handleRemove={handleRemove} />
          ))}
        </div>
        <div className="details"></div>
      </div>
    </div>
  )
}
export default App
