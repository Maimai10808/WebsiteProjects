import React, {useState} from "react";


function MyComponent() {

    const [name, setName] = useState("Guest");

    const [age, setAge] = useState(0)

    const updateName = () => {
        setName("Mai")
    }

    const incrementAge = () => {
        setAge(age + 1)
    }


    return(
        <div>
            <p>Name: {name}</p>
            <button onClick={updateName}> Set Name </button>

            <p>Age: {age}</p>
            <button onClick={incrementAge}> Increment Age </button>

        </div>


    )

}

export default MyComponent


/*
	•	useState(0)
给 count 设一个初始值 0
	•	count
当前的状态值
	•	setCount()
改变状态的唯一方法（React 会自动触发重新渲染）
*/
