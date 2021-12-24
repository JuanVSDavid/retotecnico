import './Answer.css' 

const Answer = ({ option, colorStyle, ...props }) => {
    return (
        <button value={option} type="submit" className={`col-12 col-md-6 btn ${colorStyle} tama`} {...props}>{option}</button>
    )
}

export default Answer