import PropTypes from 'prop-types';


function Student(props) {
    return(
            <div className="student">
                <p>Name: {props.name1}</p>
                <p>Name: {props.name2}</p>
                <p>Name: {props.isStudent ? "yes" : "No"}</p>
            </div>
    );
}

Student.propTypes = {
  name1: PropTypes.string,
  name2: PropTypes.string,
  isStudent: PropTypes.bool,
};

Student.defaultProps = {
  name1: "Mai Zhen NI",
  name2: "Mai Yu Fan",
  isStudent: true,
};



export default Student
