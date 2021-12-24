import Table from './Table'

const Final = ({ data, hits, message }) => {
    return (
        <div className="h-100">
            <div className="row d-flex justify-content-between">
                <h1 className="text-white fw-bold col-12 mb-4">Prueba técnica Sofka</h1>
                <div className="col-12 col-md-6 mb-4">
                    <h4 className="mb-4">{message}</h4>
                    <div className="bg-light text-dark rounded w-100 h-100 p-5">
                        <h4 className="mb-5">Nombre: {data.name}</h4>
                        <h4>Puntaje: {hits}</h4>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <Table/>
                </div>
            </div>
        </div>
    )
}
export default Final