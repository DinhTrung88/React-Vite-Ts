import * as React from 'react'

export interface Job {
  content: string
  id?: number
}

interface IDisplayProps {
  onFix: (param: number | undefined) => void
  handleRemove: (param: number | undefined) => void
  job: Job
}

export default function Display({ job, onFix, handleRemove }: IDisplayProps) {
  return (
    <div>
      <ul className="list-content" key={job.id}>
        <li>
          <p>{job.content}</p>
        </li>
        <li>
          <i onClick={() => onFix(job.id)} className="fa-solid fa-wrench"></i>
          <i onClick={() => handleRemove(job.id)} className="fa-solid fa-trash"></i>
        </li>
      </ul>
    </div>
  )
}
