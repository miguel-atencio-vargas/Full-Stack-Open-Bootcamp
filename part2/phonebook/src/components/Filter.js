import React from 'react';

const Filter = (props) => {
  return(
    <div>
      <span>filter shown with: 
        <input onChange={props.handleChange} />
      </span>
    </div>
  )
}

export default Filter;