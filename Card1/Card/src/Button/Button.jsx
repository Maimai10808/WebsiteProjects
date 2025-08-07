import styles from './Button.module.css'

function Button({ name }) {

  const greet = (person) => {
    alert(`Hello, ${person}!`);
  };

  return (
    <button onClick={() => greet(name)}>
      Greet {name}
    </button>
  );
}

export default Button
