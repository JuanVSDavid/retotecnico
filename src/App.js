import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Question from './components/Question'

const App = () => {
  const [data, setData] = useState({})
  const [isStart, setIsStart] = useState(false)
  return (
    <>
      <Container>
        {!isStart ?
          <Formik
            initialValues={{
              name: '',
              email: '',
            }}
            onSubmit={values => {
              setData(values)
              setIsStart(!isStart)
            }
            }
            validationSchema={
              Yup.object({
                name: Yup.string().required('El nombre es obligatorio').min(3, "Tu nombre debe de tener mas de 3 caracteres").max(250, "Un nombre no tiene mas de 250 caracteres"),
                email: Yup.string().required('El email es obligatorio').max(250, "Un email no tiene mas de 250 caracteres")
              })
            }
          >
            <Form className="col-12 p-3">
              <Input label="Nombre Completo" name="name" type="text" />
              <Input label="Email" name="email" type="email" />
              <Button>Iniciar Prueba</Button>
            </Form>
          </Formik> : <Question data={data}/>}
      </Container>
    </>
  )
}

export default App;
