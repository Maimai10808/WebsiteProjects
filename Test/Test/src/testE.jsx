import React, { useContext } from "react"
import { UserContext } from "./testA.jsx"

function testE() {

    const user = useContext(UserContext)


    return (<>
            <div className="box">
                    <h1>testE</h1>
                    <h2>{`Bye ${user}`}</h2>
            </div>

    </>)
}

export default testE
