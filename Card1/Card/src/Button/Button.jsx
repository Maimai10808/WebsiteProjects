import styles from './Button.module.css'

function Button({ name }) {

  const handleClick = (e) => e.target.textContent = "OUCH!"

  return (
    <button onClick={(e) => handleClick(e)}>
      Click me
    </button>
  );
}

export default Button
