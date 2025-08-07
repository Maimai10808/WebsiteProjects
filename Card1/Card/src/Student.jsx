


function Student(props) {
    return(
            <div className="student">
                <p>Name: {props.name1}</p>
                <p>Name: {props.name2}</p>
                <p>Name: {props.isStudent ? "yes" : "No"}</p>
            </div>
    );
}

Student.prototype = {
    name1    : PropTypes.string,
    name2    : PropTypes.string,
    isStudent: PropTypes.bool,
}


export default Student
