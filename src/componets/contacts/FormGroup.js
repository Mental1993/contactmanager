import React from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

const FormGroup = (props) => {

  const {label,type, name, placeholder, value, onChange, error} = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input 
        type={type} 
        name={name}
        className={classnames('form-control form-control-lg', {'is-invalid': error})}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      
    </div>
  )
}

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

FormGroup.defaultProps = {
  type: 'text'
}

export default FormGroup;
