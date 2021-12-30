import React, { useEffect, useState } from "react";
import { CaretRightOutlined } from '@ant-design/icons'
import Editor from "@monaco-editor/react";

const Editorpane = (props: any) => {

    const [key, setKey] = useState(0);
    const [runBtn, setRunBtn] = useState(false);

    const [currfileName, setCurrfileName] = useState(Object.keys(props.files)[0]);
    console.log(currfileName);

    useEffect(() => {
        console.log('refresh, ', currfileName)
        if (currfileName.split('.')[1] === 'cpp' || currfileName.split('.')[1] === 'java' || currfileName.split('.')[1] === 'py') {
            setRunBtn(true);
        } else {
            setRunBtn(false);
        }
        setKey((prev: number) => prev + 1);
    }, [currfileName])

    useEffect(() => {
        setCurrfileName(Object.keys(props.files)[0]);
    }, [props.files])


    const onChangeHandler = (value: any) => {
        console.log(value);

        let newFiles = props.files;
        newFiles[currfileName].value = value;
        props.updateFiles(newFiles);
    }



    return (
        <>
            {Object.keys(props.files).map((file) => {
                return (<button
                    disabled={currfileName === file}
                    onClick={() => setCurrfileName(file)}
                >
                    {file}
                </button>
                )
            })}
            {runBtn && <CaretRightOutlined style={{ fontSize: '20px' }} className="mx-3 my-auto" onClick={() => props.runHandler(currfileName)} />}


            <Editor
                height="80vh"
                key={key}
                theme="vs-dark"
                defaultLanguage={props.files[currfileName] ? props.files[currfileName].language : 'js'}
                value={props.files[currfileName] ? props.files[currfileName].value : ''}
                onChange={onChangeHandler}
            />
        </>
    )
}

export default Editorpane
