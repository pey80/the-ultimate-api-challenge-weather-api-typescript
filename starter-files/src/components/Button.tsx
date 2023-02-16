import Loader from './Icons/loader'

type Props = {
  text: string
  loading: boolean
  disabled: boolean
  styling: string
  id: string
  onClick: () => void
}

const Button = ({
  text,
  loading = false,
  disabled,
  styling,
  id,
  onClick,
}: Props): JSX.Element => {
  return (
    <button id={id} className={styling} onClick={onClick} disabled={disabled}>
      <div className={loading ? 'animate-spin cursor-not-allowed' : ''}>
        {!loading ? text : <Loader />}
      </div>
    </button>
  )
}

export default Button
