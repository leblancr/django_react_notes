import { Link } from 'react-router-dom'

const getContent = (note: any) => {
    const title = getTitle(note) // split by newlines
    console.log('note.body', note.body)
    let content = note.body.replaceAll('\n', ', ') // remaining items
    console.log('content', content)
    content = content.replaceAll(title, '') // replace title with nothing
    console.log('content', content)
    console.log('content[0]', content[0])

    // remove leading commas
    while(content.charAt(0) === ',' || content.charAt(0) === ' '){
        console.log('remove')
        content = content.substring(1);
    }

    console.log('content', content)

    if (content.length > 45){
        return content.slice(0, 45) + '...'
    }else{
        return content
    }
}

const getTime = (note: any) => {
    return new Date(note.updated).toLocaleDateString()
}

const getTitle = (note: any) => {
    const title = note.body.split('\n')[0]
    if (title.length > 45){
        return title.slice(0, 45)
    }
    return title
}

// Each note item in the list is a link to that note url
// Here the note object is passed in from NotesListPage
const ListItem = (props: any) => {
    console.log('ListItem props', props)
    console.log('ListItem props.id', props.note.id)
    return(
        <Link to={`notes/${props.note.id}`}>
            <div className="notes-list-item">
                <h3>{getTitle(props.note)}</h3>
                <p><span>{getTime(props.note)}</span>{getContent(props.note)}</p>
            </div>
        </Link>
        )
}


export default ListItem