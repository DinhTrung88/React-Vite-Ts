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

    fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: job }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedjobList = [...jobList, { content: job, id: data.id }]
        setJobList(updatedjobList)
      })
      .catch((error) => {
        console.error('Error adding job:', error)
      })

    setJob('')
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  const handleRemove = async (id: number) => {
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
  const onEdit = (id: number) => {
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
  console.log('abc')
  return (
    <div className="app">
      <div className="app_list">
        <h1>TODO LIST</h1>
        <div className="content">
          <Input handleSetJob={handleSetJob} job={job} inputRef={inputRef} />
          <button onClick={handleAdd} type="button" className="btn btn-primary ms-2">
            Add
          </button>
          <button onClick={handleEdit} type="button" className="btn btn-primary ms-2">
            Edit
          </button>
        </div>
        <div id="list-container">
          {jobList.map((job) => (
            <Display key={job.id} job={job} onEdit={onEdit} handleRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default App
