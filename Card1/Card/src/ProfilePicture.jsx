

function ProfilePicture() {

    const imageUrl = "Card/src/assets/profile.JPG"

    const handleClick = () => console.log("OUCH!")

    return  (<img onClick={handleClick} src={imageUrl}></img>)
}


export default ProfilePicture
