import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({note}) => (
    <p><Link to={`notes/${note.id}`}>{note.body}</Link></p>
        )


export default ListItem