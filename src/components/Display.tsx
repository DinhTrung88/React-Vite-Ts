import * as React from 'react'

export interface Job {
  content: string
  id: number
}

interface IDisplayProps {
  onEdit: (param: number) => void
  handleRemove: (param: number) => void
  job: Job
}

export default function Display({ job, onEdit, handleRemove }: IDisplayProps) {
  return (
    <div>
      <ul className="list-content" key={job.id}>
        <li>
          <p>{job.content}</p>
        </li>
        <li>
          <i onClick={() => onEdit(job.id)} className="fa-solid fa-wrench"></i>
          <i onClick={() => handleRemove(job.id)} className="fa-solid fa-trash"></i>
        </li>
      </ul>
    </div>
  )
}
