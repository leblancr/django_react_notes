import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ChevronLeft } from '../assets/chevron-left.svg'

const NotePage = () => {
    let noteId = useParams().id
    let [note, setNote] = useState(null)
    const history = useNavigate()
    
    // useEffect takes arrow function
    useEffect(() => {
        getNote()
    }, [noteId])
    
    let deleteNote = async () => {
        fetch(`/api/notes/${note.id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
        history('/')
    }

    let getNote = async () => {
        try{
            let response = await fetch(`/api/notes/${noteId}`)
            console.log('response', response)
            let data = await response.json()
            console.log('data', data)
            setNote(data)
        } catch (err) {
            // ⛔️ Uncaught SyntaxError: JSON.parse: unexpected character at
            // line 1 column 2 of the JSON data
            console.log('err:', err.message);
        }
    }

    let updateNote = async () => {
        fetch(`/api/notes/${note.id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    let handleSubmit = () => {
        updateNote()
        history('/')
    }
    
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ChevronLeft onClick={handleSubmit}/>
                </h3>
                <button onClick={deleteNote}>Delete</button>
            </div>
            <textarea onChange={e => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
        )
}

export default NotePage