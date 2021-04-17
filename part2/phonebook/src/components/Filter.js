import React from 'react';

const Filter = (props) => {
  return(
    <div>
      <span>filter shown with: 
        <input onChange={props.handleChange} value={props.searchPerson} />
      </span>
    </div>
  )
}

export default Filter;