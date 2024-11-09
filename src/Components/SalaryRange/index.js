import './index.css'

const SalaryRange = props => {
  const {values1, changeTheRadio} = props
  const {salaryRangeId, label} = values1

  const changeTheSalary = event => {
    changeTheRadio(event.target.value)
  }

  return (
    <li className="list-item">
      <input
        type="radio"
        value={salaryRangeId}
        name="salary"
        onChange={changeTheSalary}
      />
      <label className="label-item">{label}</label>
    </li>
  )
}

export default SalaryRange
