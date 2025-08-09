import React, {useState} from "react";


function Counter() {

    const [num, setNum] = useState(0)

    const plus = () => {
        setNum( num => num  + 1 )
    }

    const de = () => {
        setNum( num => num - 1 )
    }

    const backToZero = () => {
        setNum( 0 )
    }



    return <>
     <p>Number: {num}</p>
    <button onClick={plus}> +1 </button>
    <button onClick={de}>   -1 </button>
    <button onClick={backToZero}> Set Zero </button>

    </>


}

export default Counter
