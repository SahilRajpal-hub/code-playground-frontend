import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div>
            <Spinner animation="border" />
            <h1> Processing..</h1>
        </div>
    )
}

export default Loader
