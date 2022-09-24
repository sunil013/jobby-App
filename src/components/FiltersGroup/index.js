import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const {onChangeSalary, onChangeEmployment} = props

  const changeSalary = event => {
    onChangeSalary(event.target.value)
  }

  const onChangeCheck = event => {
    onChangeEmployment(event)
  }

  return (
    <div className="filters-container">
      <hr className="separator" />
      <div className="employment-salary-container">
        <h1 className="filters-heading">Type of Employment</h1>
        <ul className="list-items-filter">
          {employmentTypesList.map(eachItem => (
            <li className="each-item" key={eachItem.employmentTypeId}>
              <input
                type="checkbox"
                value={eachItem.employmentTypeId}
                id={eachItem.employmentTypeId}
                className="check-box"
                onChange={onChangeCheck}
              />
              <label htmlFor={eachItem.employmentTypeId} className="labels">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="separator" />
      <div className="employment-salary-container">
        <h1 className="filters-heading">Salary Range</h1>
        <ul className="list-items-filter">
          {salaryRangesList.map(eachItem => (
            <li className="each-item" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                value={eachItem.salaryRangeId}
                name="salary"
                id={eachItem.salaryRangeId}
                className="radio-box"
                onChange={changeSalary}
              />
              <label htmlFor={eachItem.salaryRangeId} className="labels">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersGroup
