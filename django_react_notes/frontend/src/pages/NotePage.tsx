import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ChevronLeft } from '../assets/chevron-left.svg'

// display the note
const NotePage = () => {
    console.log('useParams', useParams())
    let [note, setNote] = useState({'id': useParams().id, 'body': '', 'created': '', 'updated': ''})
    console.log('note', note)
    const navigate = useNavigate()
    
    const getNote = async () => {
        try{
            console.log('note.id', note.id)
            if (note.id === 'new') return
            const response = await fetch(`/api/notes/${note.id}`)
            const data = await response.json()
            console.log('getNote data', data)
            setNote(data)
        } catch (err) {
            // ⛔️ Uncaught SyntaxError: JSON.parse: unexpected character at
            // line 1 column 2 of the JSON data
            if (err instanceof Error) {
                console.log('err:', err.message)
            } else {
                console.log("getNote Failed")
            }
        }
    }

    // useEffect takes arrow function, called when page renders
    useEffect(() => {
        console.log("NotePage useEffect")
        getNote() // when clicking on a note we get the note from the database
    }, [])

    const createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    const deleteNote = async () => {
        fetch(`/api/notes/${note.id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
        console.log('deleteNote navigate')
        navigate('/') // go back to notes list page
    }

    // for chevron or done button
    const handleSubmitNote = () => {
        console.log('note', note)
        if(note.id !== 'new' && !note.body){
            console.log('deleteNote', deleteNote)
            deleteNote() // existing note with no body
        } else if (note.id !== 'new' ){
            console.log('updateNote', updateNote)
            updateNote() // existing note with body
        } else if (note.id === 'new' && note.body){
            console.log('createNote', createNote)
            createNote() // new note with body
        }
        console.log('handleSubmitNote navigate')
        navigate('/') // go back to notes list page
    }

    const updateNote = async () => {
        fetch(`/api/notes/${note.id}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    // submit note by chevron or done button
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ChevronLeft onClick={handleSubmitNote}/>
                </h3>
                {note.id !== 'new' ? (
                    <button onClick={deleteNote}>Delete note</button>
                ):(
                    <button onClick={handleSubmitNote}>Done</button>
                )}
            </div>
            <textarea onChange={e => {
                console.log('onChange note1', note)
                console.log('e.target.value', e.target.value)
                setNote({...note, body: e.target.value})
             }} value={note.body}></textarea>
        </div>
        )
}

export default NotePage