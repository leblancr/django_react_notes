import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'

const NotesListPage = () => {
    let [notes, setNotes] = useState([])
    
    // useEffect takes arrow function
    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        try{
            let response = await fetch('/api/notes/')
            console.log('response', response)
            let data = await response.json()
            console.log('data', data)
            setNotes(data)

        } catch (err) {
            // ⛔️ Uncaught SyntaxError: JSON.parse: unexpected character at
            // line 1 column 2 of the JSON data
            console.log('err:', err.message);
        }


    }
    
    console.log('notes', notes)
    return (
        <div>
            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note}/>
                ))}
            </div>
        </div>
        )
}

export default NotesListPage