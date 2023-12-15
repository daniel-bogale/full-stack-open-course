import noteServices, { NoteType } from './services/notes'

import { useEffect, useState } from "react"

const App = () => {
  const [allNotes, setAllNotes] = useState<NoteType[]>([])
  useEffect(() => {
    return () => {
      noteServices.getAll().then((response: []) => {
        setAllNotes(response)
      })
    }
  }, [])

  const toggleImportance = (id: number) => {
    const indexOfNote: number = allNotes.findIndex((note) => note.id === id)!;
    const modifiedNote: NoteType = { ...allNotes[indexOfNote], important: !allNotes[indexOfNote].important }
    const allNotesCopy = [...allNotes]
    allNotesCopy[indexOfNote] = modifiedNote;
    setAllNotes(allNotesCopy)
    noteServices.update(id, modifiedNote)
  }

  return (
    <>
      <h1> All Notes </h1>
      <ul>
        {allNotes.map(
          (note: NoteType) => {
            return <li key={note.id}>
              <p>{note.content}</p>
              <button style={{ color: "gray" }} onClick={() => toggleImportance(note.id)}>{note.important ? "Make Important" : "Make not-important"}</button>
              <i>{note.id}</i>
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
