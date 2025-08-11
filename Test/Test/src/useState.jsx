// useState() = Re-renders the component when the state value changes.

// useRef() = "use Reference" Does not cause re-renders when its value changes.
//              When you want a component to "remember" some information,
//              but you don't want that information to trigger new renders

//              1. Accessing/Interacting with DOM elements
//              2. Handling Focus, Animations, and Transitions
//              3. Managing Timers and Intervals



import React, { useState, useEffect, useRef } from "react";


function useState() {


    const ref = useRef(0)

    useEffect(() => {

    })



    function handleClick() {
        ref.current++
        console.log(ref.current)
    }


    return(<>
    <button onClick={handleClick}>
            Click me!
    </button>
    </>)
}

export default useState


/*
useRef = “保险箱”
	•	里面的值不会丢
	•	改了也不会通知别人（不触发重新渲染）
	•	常用来存 DOM 引用 和 跨渲染变量
*/
