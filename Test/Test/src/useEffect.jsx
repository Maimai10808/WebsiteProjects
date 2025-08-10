/*

   useEffect() = React hook that tells React DO SOME CODE WHEN (pick one):
                        this component re-renders
                        this component mounts
                        The state of a value


   useEffect(function, [dependencies])

   1. useEffect(() => {}) // Runs after every re-render
    2. useEffect(()=> {}, []) // Runs only on mount
    3. useEffect(() => {}, [value]) // Runs on mount + when value changes


    USES

    #1 Event listeners
    #2 DOM manipulation
    #3 Subscriptions (real-time updates)
    #4 Fetching Data from An API
    #5 Clean up when a component unmounts

*/

import React, { useState, useEffect } from "react";

function MyComponent() {

    const [count, setCount] = useState(0)
    const [color, setColor] = useState("green")

    useEffect(() => {
        document.title = `Count: ${count} ${color}`

        return () => {
    // 清理逻辑（可选）
    console.log("清理执行");
  };

    }, [count, color])

    function addCount() {
            setCount(count => count + 1)
    }

    function Subtract() {
            setCount(count => count - 1)
    }

    function ChangeColor() {
            setColor(color => color === "green" ? "red" : "green")
    }

    return (<>
        <p style={{ color: color }}>Count: {count}</p>
        <button onClick={addCount}>Add</button>
        <button onClick={Subtract}>Subtract</button>
        <button onClick={ChangeColor}> Change Color</button>
    </>)
}

export default MyComponent
