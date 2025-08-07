import Card  from "./Card"
import Button from "./Button/Button.jsx"
import Student from "./Student.jsx"
import UserGreeting from "./UserGreeting.jsx"

function App() {

  return(
    <>
        <Card />
        <Card />
        <Button />
        <Student name1= "Mai" name2= "Mai" isStudent= {true} />
        <UserGreeting isLoggedIn= {true} username = "Mai"/>

    </>

  )

}

export default App
