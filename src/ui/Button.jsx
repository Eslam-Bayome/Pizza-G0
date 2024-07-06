import { Link } from "react-router-dom";
function Button({
  children,
  onClick = () => {},
  disabled = false,
  to,
  type = "primary",
}) {
  const className = `mt-4 inline-block rounded-full  text-sm
   bg-yellow-400 font-medium  uppercase tracking-wide  text-stone-800
   transition-colors hover:bg-yellow-300
  focus:bg-yellow-300 focus:outline-none focus:ring-2
   focus:ring-yellow-300 focus:ring-offset-2 
   disabled:cursor-not-allowed `;

  const styles = {
    primary: className + ` md:px-5 md:py-3 px-4 py-2`,
    small: className + ` md:px-3 md:py-2 px-3 py-1.5 text-xs `,
    round: className + ` md:px-2.5 md:py-1.5 px-2 py-1 text-sm `,
    secondary: `mt-4 inline-block rounded-full border-2 border-stone-300
     font-medium  uppercase tracking-wide  text-stone-400
    transition-colors hover:bg-stone-300 hover:text-stone-700
   focus:bg-stone-300 focus:outline-none focus:ring-2
   focus:text-stone-700 text-sm
    focus:ring-stone-300 focus:ring-offset-2 
    disabled:cursor-not-allowed d:px-5 md:py-2.5 px-4 py-1.5`,
  };
  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
