
const Button = ({children}) => {
    return (
        <div className="d-grid">
            <button type = "submit" className = "btn btn-danger">{children}</button>
        </div>
    )
}

export default Button