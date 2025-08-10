

import React, { useState, useEffect } from "react";


function windowResize() {

    const [width, setWidth]   = useState(window,innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(() => {
            window.addEventListener("resize",handleResize )
            console.log("EVENT LISTENER ADDED")

            return () => {
            window.removeEventListener("resize",handleResize )
            console.log("EVENT LISTENER REMOVED")
            }
    }, [])

    /*
    你这段 useEffect 的作用：在组件挂载时给 window 绑定一次 resize 事件监听器；在组件卸载时，把这个监听器移除，防止内存泄漏和重复绑定。
    	•	useEffect(() => { ... }, [])
依赖数组是 []，表示这个 effect 只在第一次渲染后运行一次（componentDidMount），以及在组件卸载时运行它返回的清理函数（componentWillUnmount）。
	•	window.addEventListener("resize", handleResize)
绑定窗口大小变化的事件，触发时调用 handleResize 去 setWidth/setHeight，从而更新 state ➜ 组件会重新渲染。
	•	return () => { window.removeEventListener("resize", handleResize) }
这是 清理函数。当组件卸载（或依赖变化时重跑 effect 之前）执行，移除监听器，避免：
	1.	组件已经没了但事件还在触发导致报错；
	2.	多次绑定造成性能问题或重复触发。
	•	日志两行只是方便你在控制台看到绑定/解绑发生了。
    */

    useEffect(() => {
        document.title =  `Size: ${width} x ${height}`
    }, [width, height])



    function handleResize() {
        setWidth(window,innerWidth)
        setHeight(window.innerHeight)
    }

    return (<>
        <p>Window Width: {width}px</p>
        <p>Window Height: {height}px</p>
    </>)
}

export default windowResize
