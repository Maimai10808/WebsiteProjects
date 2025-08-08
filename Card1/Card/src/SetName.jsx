import React, {useState} from "react";


function SetName() {

    const [name, setName] = useState("Guest")
    const [quantity, setQuantity] = useState()
    const [payment, setPayment] = useState()
    const [shipping, setShipping] = useState()

    function handleNameChange(event) {
            setName(event.target.value)
    }

    function handleQuantityChange(event) {
            setQuantity(event.target.value)
    }


    function handlePaymentChange(event) {
            setPayment(event.target.value)
    }

    function handleShippingChange(event) {
            setShipping(event.target.value)
    }


    return (<>
    <div>
                <input value={name} onChange={handleNameChange} />
                <p>Name: {name}</p>


                <input value={quantity} onChange={handleQuantityChange} />
                <p>Quantity: {quantity}</p>

                <select value={payment} onChange={handlePaymentChange}>
                    <option value="">Select an option</option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Giftcard">Giftcard</option>
                </select>

                <p>Payment: {payment}</p>
            </div>

            <div>
            <label htmlFor="">
                <input type="radio"  value="Pick Up"
                        checked = {shipping === "Pick Up"}
                        onChange={handleShippingChange}


                />
                Pick Up

            </label><br />

            <label htmlFor="">
            <input type="radio" value= "Delivery"

                        checked = {shipping === "Delivery"}
                        onChange={handleShippingChange}
            />
            Delivery

            </label>
            <p>Shipping: {shipping}</p>



            </div>

            </>

    )
}

export default SetName
