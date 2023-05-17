import {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from "../components/AddButton.tsx";

// Get all notes and call ListItem() on each one.
// ListItem shows title, first 45 chars and date created
const NotesListPage = () => {
    const [notes, setNotes] = useState([])
    
    // useEffect takes arrow function, runs when page renders
    useEffect(() => {
        console.log('useEffect')
        getNotes() // Gets all notes and puts them in notes with setNotes()
        getNotes() // Gets all notes and puts them in notes with setNotes()
        getNotes() // Gets all notes and puts them in notes with setNotes()
    }, [])

    const getNotes = async () => {
        try{
            const response = await fetch('/api/notes/')
            console.log('getNotes response', response)
            const data = await response.json()
            console.log('getNotes data', data)
            setNotes(data)
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
    
    // Each note object gets sent to ListItem
    console.log('notes', notes)
    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note}/>
                ))}
            </div>
            <AddButton />
        </div>
        )
}

export default NotesListPage