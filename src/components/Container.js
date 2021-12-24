const Container = ({children}) => {
    return (
    <div className="container-fluid vw-100 vh-100">
        <div className="text-white w-100 h-100 row d-flex align-items-center justify-content-center rounded p-5">
            {children}
        </div>
    </div>
    )
}

export default Container