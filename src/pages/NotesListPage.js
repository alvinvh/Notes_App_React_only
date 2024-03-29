import React, {useEffect, useState} from 'react'
//import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect (() => {
        getNotes()
    },[])

    let getNotes = async() => {
        let response = await fetch('http://localhost:5000/notes')
        let data = await response.json()
        setNotes(data)
    }

  return (
    <div>
        <AddButton />
        <div className="notes">
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            {notes.map((note,index) => (
                <ListItem key={index} note={note} />
            ))}
        </div>
        
    </div>
  )
}

export default NotesListPage