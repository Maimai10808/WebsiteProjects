import React, { useState } from "react";


function ARRAYSApp() {

    const [foods, setFoods] = useState(["Apple", "Orange", "Banana"])

    function handleAddFood() {
        const newFood = document.getElementById("foodInput").value;

        if (newFood == 0) {

        } else {
        document.getElementById("foodInput").value = ""

        setFoods(food => [...food, newFood])
        }

    }

    function handleRemoveFood(index) {
        setFoods(foods.filter((_, i) => i !== index))
    }



    return (<>
    <div>
        <ul>
            {foods.map((food, index) =>

            <li value={index} onClick={() => handleRemoveFood(index)}>{food}</li>)}
        </ul>

        <input type="text"  id="foodInput" placeholder="Enter food name" / >
        <button onClick={handleAddFood}>Add Food</button>

    </div>

    </>)
}

export default ARRAYSApp

