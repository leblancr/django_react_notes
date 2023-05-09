import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ChevronLeft } from '../assets/chevron-left.svg'

//
const NotePage = () => {
    console.log('useParams', useParams())
    const noteId = useParams().id
    let [note, setNote] = useState({'id': '', 'body': '', 'created': '', 'updated': ''})
    const history = useNavigate()
    
    // useEffect takes arrow function
    useEffect(() => {
        getNote()
    }, [noteId])
    
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
        fetch(`/api/notes/${noteId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
        history('/')
    }

    const getNote = async () => {
        try{
            console.log('noteId', noteId)
            if (noteId === 'new') return
            const response = await fetch(`/api/notes/${noteId}`)
            const data = await response.json()
            console.log('getNote data', data)
            setNote(data)
        } catch (err) {
            // ⛔️ Uncaught SyntaxError: JSON.parse: unexpected character at
            // line 1 column 2 of the JSON data
            if (err instanceof Error) {
                console.log('err:', err.message)
            } else {
                console.log("getNote Failed");
            }
        }
    }

    const handleSubmit = () => {
        console.log('noteId', noteId)
        console.log('note.body', note)
        if(noteId !== 'new' && !note){
            console.log('deleteNote', deleteNote)
            deleteNote()
        } else if (noteId !== 'new' ){
            console.log('updateNote', updateNote)
            updateNote()
        } else if (noteId == 'new'){
            console.log('createNote', createNote)
            createNote()
        }
        history('/')
    }

    const updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ChevronLeft onClick={handleSubmit}/>
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete note</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
        )
}

export default NotePage