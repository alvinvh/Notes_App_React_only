import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
//import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'


const NotePage = () => {

    let noteID = useParams().id
    let history = useNavigate()

    //let note = notes.find(note => note.id === Number(noteID))

    let[note,setNote] = useState(null)

    useEffect(() => {
        getNote()
    },[noteID])

    let getNote = async() => {
        if (noteID === 'new') return
        let response = await fetch(`http://localhost:5000/notes/${noteID}`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async () => {
        await fetch(`http://localhost:5000/notes/${noteID}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated':new Date()})
        })
    }

    let createNote = async () => {
        await fetch(`http://localhost:5000/notes/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated':new Date()})
        })
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:5000/notes/${noteID}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
        history('/')
    }


    let handleSubmit = () => {

        if(noteID !== 'new' && !note.body){
            deleteNote()
        }else if(noteID !== 'new'){
            updateNote()
        }else if(noteID === 'new' && note !== null){
            createNote()
        }

        history('/')
    }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/">
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
            </h3>

            {noteID !== 'new' ?(
                <button onClick={deleteNote}>Delete</button>
            ): (
                <button onClick={handleSubmit}>Done</button>
            )}
            
        </div>
        <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value = {note?.body}></textarea>
    </div>
  )
}

export default NotePage