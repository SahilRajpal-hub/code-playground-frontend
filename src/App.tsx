import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Editorpane from './Components/Editorpane';
import Terminal from './Components/Terminsl';
import FileSystem from './Components/FileSystem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Components/Loader';

const App = () => {

    console.log(process.env.REACT_APP_SECRET_URL)
    const [srcDoc, setSrcDoc] = useState(`<h1>Start your ride. Happy Play!</h1>`);
    const [currFile, setCurrFile] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [files, setFiles] = useState([{
        "script.js": {
            name: "script.js",
            language: "javascript",
            value: ``,
        },
        "style.css": {
            name: "style.css",
            language: "css",
            value: ``,
        },
        "index.html": {
            name: "index.html",
            language: "html",
            value: ``,
        },
    }, {
        "main.cpp": {
            name: "main.cpp",
            language: "cpp",
            value: ``
        }
    }, {
        "main.py": {
            name: "main.py",
            language: "python",
            value: ``
        }
    }, {
        "main.java": {
            name: "main.java",
            language: "java",
            value: ``
        }
    }]);

    const saveFilesInDB = async () => {
        setLoading2(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(`${process.env.REACT_APP_SECRET_URL}/api/v1/snippet/`, files, config);
        console.log(data)
        setLoading2(false);
    }

    const runHandler = (currfileName: string) => {
        setLoading(true);
        const input = "5";
        const extension = currfileName.split('.')[1];
        const code = (files[currFile] as any)[currfileName]?.value;
        const url = `${process.env.REACT_APP_SECRET_URL}/api/v1/execute/${extension}`;

        axios.post(url, { code, input }).then(data => {
            console.log(data.data);
            setSrcDoc(`
                <h1>${data.data.output}</h1>
            `)
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {

        const fetchData = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_SECRET_URL}/api/v1/snippet/`);
            console.log(data);
            setFiles(data);
        }

        fetchData();

    }, [])

    const setCurrentFile = (currFileIndex: any) => {
        setCurrFile(currFileIndex);
    }

    const updateFiles = (files: any) => {
        console.log(files[currFile])
        setFiles(prevFiles => {
            let newFiles = prevFiles;
            newFiles[currFile] = files;
            return newFiles;
        })
        if (currFile === 0) {
            // web selected
            setSrcDoc(`
                <body>${files['index.html']['value']}</body>
                <style>${files['style.css']['value']}</style>
                <script>${files['script.js']['value']}</script>
            `)
            console.log(srcDoc);
        } else if (currFile === 1) {
            // cpp selected
        }
        else if (currFile === 2) {
            // javascript selected
        }
        else if (currFile === 3) {
            // java selected
        }
    }

    return (
        <SplitterLayout primaryIndex={1} secondaryInitialSize={250}>
            <div className="my-pane">
                {loading2 ? <Loader /> : <FileSystem files={files[currFile]} setCurrentFile={setCurrentFile} saveFiles={saveFilesInDB} updateFiles={updateFiles} />}
            </div>
            <SplitterLayout secondaryInitialSize={250}>
                <SplitterLayout vertical secondaryInitialSize={250}>
                    <div className="my-pane">
                        <Editorpane files={files[currFile]} updateFiles={updateFiles} runHandler={runHandler} />
                    </div>
                    <SplitterLayout secondaryInitialSize={250}>
                        <Terminal />

                    </SplitterLayout>
                </SplitterLayout>
                <div className="web-pane">
                    {loading ? <Loader /> : <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox='allow-scripts'
                        frameBorder={0}
                        width='100%'
                        height="100%" />}
                </div>
            </SplitterLayout>
        </SplitterLayout>
    )
}

export default App
