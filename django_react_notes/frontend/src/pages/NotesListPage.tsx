import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'

const NotesListPage = () => {
    let [notes, setNotes] = useState([])
    
    // useEffect takes arrow function
    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/notes/')
        console.log('response', response)
        let data = await response.json()
        console.log('data', data)
        setNotes(data)
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