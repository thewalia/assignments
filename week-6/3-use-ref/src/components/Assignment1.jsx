import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {

    const chaman = useRef(null)

    useEffect(() => {
        chaman.current.focus() //for focusing on page load
    }, []);

    const handleButtonClick = () => {
        chaman.current.focus()
    };

    return (
        <div>
            <input ref={chaman} type="text" placeholder="Enter text here" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
