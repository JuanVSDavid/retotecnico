import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import Answer from './Answer'
import Final from './Final'

const Question = ({ data }) => {
    const [apiResponse, setApiResponse] = useState()
    const [indexResponse, setIndexResponse] = useState(0)
    const [points, setPoints] = useState(0)
    const [answerQ, setAnswerQ] = useState("")
    const [isCorrect, setIsCorrect] = useState(true)
    const [message, setMessage] = useState(`Oops llegaste a la ronda ${indexResponse + 1}`)

    const requestQuestions = async () => {
        const response = await fetch('http://localhost:8080/api/listPreguntas')
        const allQuestions = await response.json()
        setApiResponse(allQuestions)
    }

    const postScore = async () => {
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data, score: { scoreA: points } })
            }
            console.log(points)
            const res = await fetch('http://localhost:8080/api/uploadScore', config)
        } catch (error) {

        }
    }

    const submitFinish = () => {
        postScore()
        setIsCorrect(!isCorrect)
    }

    useEffect(() => {
        requestQuestions()
    }, [])
    // console.log({...data, score:{scorea: points}})
    return (
        <div className="h-100">
            {isCorrect ? <div className="h-100">
                {!apiResponse ? <h4>Cargando...</h4> : <div className="h-100 d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                        <h1 className="text-white fw-bold col-12 col-md-9">Prueba técnica Sofka</h1>
                        <button onClick={() => {
                            postScore()
                            setMessage('Oops renunciaste')
                            setIsCorrect(!isCorrect)
                        }} className="btn btn-danger col-12 col-md-3">Salir</button>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-between p-2">
                        <p>Nombre: {data.name}</p>
                        <p>Puntos Ganados: {points}</p>
                        <p>Dificultad: {apiResponse[indexResponse].level.toUpperCase()}</p>
                        <p>Puntos a ganar: {apiResponse[indexResponse].points}</p>
                    </div>
                    <h2 className="text-danger text-center fw-bold mb-4">{apiResponse[indexResponse].enunciado}</h2>
                    <div className="row h-50">
                        <Formik
                            initialValues={{
                                answer: ''
                            }}
                            onSubmit={() => {
                                if (indexResponse === 4) {
                                    setPoints(points + apiResponse[indexResponse].points)
                                    setMessage("Felicitaciones completaste las 5 rondas")
                                    submitFinish()
                                }
                                if (answerQ === apiResponse[indexResponse].options.answer) {
                                    setPoints(points + apiResponse[indexResponse].points)
                                    setIndexResponse(indexResponse + 1)
                                } else {
                                    submitFinish()
                                }
                            }}
                        >
                            <Form>
                                <Answer onClick={() => setAnswerQ(apiResponse[indexResponse].options.option1)} option={apiResponse[indexResponse].options.option1} colorStyle="btn-primary text-white" />
                                <Answer onClick={() => setAnswerQ(apiResponse[indexResponse].options.option2)} option={apiResponse[indexResponse].options.option2} colorStyle="btn-success text-white" />
                                <Answer onClick={() => setAnswerQ(apiResponse[indexResponse].options.option3)} option={apiResponse[indexResponse].options.option3} colorStyle="btn-secondary text-white" />
                                <Answer onClick={() => setAnswerQ(apiResponse[indexResponse].options.option4)} option={apiResponse[indexResponse].options.option4} colorStyle="btn-danger text-white" />
                            </Form>
                        </Formik>
                    </div>
                </div>}
            </div> : <Final data={data} hits={points} message={message} />}
        </div>
    )
}
export default Question