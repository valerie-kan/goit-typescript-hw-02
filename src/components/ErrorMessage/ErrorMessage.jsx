import css from './ErrorMessage.module.css'

const ErrorMessage = ({error, noImgText}) => {
    return (<>
        <p className={css.errMes}>
            {noImgText
            ? noImgText 
            : error 
        }</p>
    </>)
}

export default ErrorMessage