// useContext() = React Hook that allows you to share values
//                  between multiple levels of components
//                  without passing props through each level


// PROVIDER COMPONENT
// 1. import {createContext} from 'react'
// 2. export const MyContext = createContext()
// 3. <MyContext.Provider value = {value}>
//      <Child />
//    <MyContext.Provider>


// CONSUMER COMPONENTS
// 1. import React, { useContext } from 'react'
//    import { MyContext } from './testA'
// 2. const value = useContext(testA)



import React, { useState, createContext } from "react"
import testB from "./testB.jsx"


export const UserContext = createContext()

function testA() {

    const [user, setUser] = useState("Mai")

    return (<>
            <div className="box">
                    <h1>testA</h1>
                <UserContext.Provider value={user}>
                    <testB  />
                </UserContext.Provider>
            </div>

    </>)
}

export default testA
