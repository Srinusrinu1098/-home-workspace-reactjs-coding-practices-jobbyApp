import './index.css'

const EmploymentType = props => {
  const {values, inputValueRecive, inputValueRemove} = props
  const {employmentTypeId, label} = values
  const inputValueSend = event => {
    if (event.target.checked === true) {
      inputValueRecive(event.target.value)
    } else {
      inputValueRemove(event.target.value)
    }
  }

  return (
    <li className="list-item">
      <input
        type="checkbox"
        value={employmentTypeId}
        onChange={inputValueSend}
        className="input-item-check"
      />
      <label className="label-item">{label}</label>
    </li>
  )
}

export default EmploymentType
