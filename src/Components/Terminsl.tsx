import React, { useRef, useEffect, useState } from "react";

import { XTerm } from "xterm-for-react";

export default function App() {
    // This is to store the command in buffer. It will be sent to the server
    // if the user presses Enter
    const [bufferedCommand, setBufferedCommand] = useState();

    const xTerminalRef = useRef();

    const onKeyPressed = (event: any) => {
        console.log(event.domEvent.keyCode);
        const printable =
            !event.domEvent.altKey &&
            !event.domEvent.ctrlKey &&
            !event.domEvent.metaKey;

        if (event.domEvent.keyCode === 13) {
            (xTerminalRef.current as any).terminal.promt();

            if (bufferedCommand !== undefined) {
                console.log(bufferedCommand);
                if (bufferedCommand === "ls") {
                    (xTerminalRef.current as any).terminal.write("\n No directories");
                } else if (bufferedCommand === "pwd") {
                    (xTerminalRef.current as any).terminal.write("\n /home/sahil");
                } else {
                    (xTerminalRef.current as any).terminal.write("\n Command not recognised");
                }
                setBufferedCommand(undefined);  // erase the previous cmd
            }
        } else if (event.domEvent.keyCode === 8) {
            // Do not delete the prompt

            if ((xTerminalRef.current as any).terminal._core.buffer.x > 17) {
                (xTerminalRef.current as any).terminal.write("\b \b");
                setBufferedCommand(
                    (bufferedCommand as any).substring(
                        0,
                        (xTerminalRef.current as any).terminal._core.buffer.x - (3 + 1)
                    )
                );
            }
        } else if (printable) {
            (xTerminalRef.current as any).terminal.write(event.domEvent.key);
            setBufferedCommand(
                bufferedCommand !== undefined
                    ? bufferedCommand + event.domEvent.key
                    : event.domEvent.key
            );
        }
    };

    useEffect(() => {
        // Create a new function "propmt" which
        // requests a promt from the user

        // Only do this, when reference has changes and is not undefined
        if ((xTerminalRef.current as any)) {
            (xTerminalRef.current as any).terminal.promt = () => {
                (xTerminalRef.current as any).terminal.write("\r\n Sahil-Terminal-$");
            };

            (xTerminalRef.current as any).terminal.promt();
        }
    }, [xTerminalRef]);



    return (
        <div>
            <XTerm
                options={{
                    cursorBlink: true,
                    disableStdin: false
                }}
                onKey={(event) => onKeyPressed(event)}
                ref={xTerminalRef as any}
            />
        </div>
    );
}


