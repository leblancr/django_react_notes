import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/addNew.svg'


const AddButton = () => {
    return (
        <Link to='/notes/new/' className='floating-button'>
            <AddIcon />
        </Link>
        )
}

export default AddButton