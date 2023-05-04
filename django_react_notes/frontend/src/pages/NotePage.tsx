import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const NotePage = () => {
    let noteId = useParams().id
    let [note, setNote] = useState(null)

    console.log('noteId', noteId)
    
    // useEffect takes arrow function
    useEffect(() => {
        getNote()
    }, [noteId])
    
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

    console.log('note', note)
    
    return (
        <div>
            <p>{note?.body}</p>
        </div>
        )
}

export default NotePage