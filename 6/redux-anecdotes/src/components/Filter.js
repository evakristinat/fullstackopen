import { newFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.newFilter(event.target.value)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter by <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { newFilter })(Filter)
