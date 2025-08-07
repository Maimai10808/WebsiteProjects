import Card  from "./Card"
import Button from "./Button/Button.jsx"
import Student from "./Student.jsx"
import UserGreeting from "./UserGreeting.jsx"
import List from "./List.jsx"

function App() {

  const fruits = [
  { id: 1, name: "apple", calories: 95 },
  { id: 2, name: "banana", calories: 105 },
  { id: 3, name: "orange", calories: 62 },
  { id: 4, name: "avocado", calories: 240 },
  { id: 5, name: "strawberry", calories: 4 },
  { id: 6, name: "grapes", calories: 62 },
  { id: 7, name: "watermelon", calories: 30 },
  { id: 8, name: "blueberries", calories: 84 },
  { id: 9, name: "pineapple", calories: 82 },
  { id: 10, name: "mango", calories: 135 }
]


const vegetables = [
  { id: 1, name: "carrot", calories: 41 },
  { id: 2, name: "broccoli", calories: 55 },
  { id: 3, name: "spinach", calories: 23 },
  { id: 4, name: "kale", calories: 33 },
  { id: 5, name: "potato", calories: 130 },
  { id: 6, name: "sweet potato", calories: 112 },
  { id: 7, name: "tomato", calories: 22 },
  { id: 8, name: "cucumber", calories: 16 },
  { id: 9, name: "onion", calories: 44 },
  { id: 10, name: "bell pepper", calories: 25 }
];



  return(
    <>
        <Card />
        <Card />
        <Button />
        <Student name1= "Mai" name2= "Mai" isStudent= {true} />
        <UserGreeting isLoggedIn= {true} username = "Mai"/>

         <ProfilePicture />




       {fruits.length > 0 && <List items= {fruits} category= "Fruits"/>}
       {vegetables.length > 0 && <List items= {vegetables} category= "vegetables"/>}



    </>

  )

}

export default App
