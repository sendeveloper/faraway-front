import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

const Button = ({ to = "", children, loading, ...otherProps }) => {
  return (
    <div className="button flex" {...otherProps}>
      {loading && <FontAwesomeIcon icon={faSpinner} />}
      {to === "" ? (
        <span>{children}</span>
      ) : (
        <a href={to} target="_blank" rel="noreferrer">
          {children}
        </a>
      )}
    </div>
  )
}

export default Button
