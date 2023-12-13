import noteServices, { NoteType } from './services/notes'

import { useEffect, useState } from "react"

const App = () => {
  const [allNotes, setAllNotes] = useState([])
  useEffect(() => {
    return () => {
      noteServices.getAll().then((response: []) => {
        setAllNotes(response)
      })
    }
  }, [])

  return (
    <>
      <h1> All Notes </h1>
      <ul>
        {allNotes.map(
          (note: NoteType, i) => {
            return <li key={i}>
              <p>{note.content}</p>
              <p style={{ color: "gray" }}>{note.important ? "important" : "not - important"}</p>
            </li>
          })}
      </ul >
      <button >
        Click to add Note
      </button>
    </>


  )
}

export default App
