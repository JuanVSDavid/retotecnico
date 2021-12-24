import { useField } from 'formik'
import styled from 'styled-components'

const MessageError = styled.div.attrs(props => ({
    className : "text-danger"
}))`
    font-size: 14px;
    font-color: #fff;
`

const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <input {...field} {...props} className="form-control mb-3" />
            {meta.touched && meta.error ? (<MessageError>{meta.error}</MessageError>) : null}
        </div>
    )
}
export default Input