import { Dropdown, ListGroup, Button } from 'react-bootstrap'

const FileSystem = (props: any) => {

    const selecthandler = (e: any) => {
        console.log(e.target.name);
        if (e.target.name === "web") {
            props.setCurrentFile(0);
        } else if (e.target.name === "cpp") {
            props.setCurrentFile(1);
        } else if (e.target.name === "python") {
            props.setCurrentFile(2);
        } else if (e.target.name === "java") {
            props.setCurrentFile(3);
        }
    }


    return (
        <div style={{ textAlign: 'center', backgroundColor: '#272C2E', height: '100vh' }}>

            <Dropdown className='py-3 rounded'>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Select Document File
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item name="web" onClick={selecthandler}>Wev (Html/js/css)</Dropdown.Item>
                    <Dropdown.Item name="cpp" onClick={selecthandler}>C++</Dropdown.Item>
                    <Dropdown.Item name="python" onClick={selecthandler}>Python</Dropdown.Item>
                    <Dropdown.Item name="java" onClick={selecthandler}>Java</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <ListGroup>
                {Object.keys(props.files).map(filename => {
                    return <ListGroup.Item className="mx-3" >{filename}</ListGroup.Item>
                })}
            </ListGroup>

            <Button className='my-5' onClick={props.saveFiles} variant="success">Save(in DB)</Button>


        </div>
    )
}

export default FileSystem
