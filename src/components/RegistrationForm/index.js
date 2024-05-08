// Write your JS code here
import './index.css'

import {Component} from 'react'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    firstNameError: false,
    lastNameError: false,
    isFormSubmitted: false,
  }

  validateLastName = () => {
    const {lastName} = this.state

    return lastName !== ''
  }

  validateFirstName = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()

    this.setState({lastNameError: !isValidLastName})
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()

    this.setState({firstNameError: !isValidFirstName})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  renderLastName = () => {
    const {lastName, lastNameError} = this.state
    const showError = lastNameError ? 'error-field' : ''

    return (
      <>
        <label className="label-text" htmlFor="lastName">
          LAST NAME
        </label>

        <input
          type="text"
          value={lastName}
          className={`user-input ${showError}`}
          id="lastName"
          placeholder="Last Name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </>
    )
  }

  renderFirstName = () => {
    const {firstName, firstNameError} = this.state
    const showError = firstNameError ? 'error-field' : ''

    return (
      <>
        <label className="label-text" htmlFor="firstName">
          FIRST NAME
        </label>

        <input
          type="text"
          value={firstName}
          className={`user-input ${showError}`}
          id="firstName"
          placeholder="First Name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </>
    )
  }

  submitForm = event => {
    event.preventDefault()

    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    // console.log(isValidFirstName)
    // console.log(isValidLastName)

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        isFormSubmitted: false,
        firstNameError: !isValidFirstName,
        lastNameError: !isValidLastName,
      })
    }
  }

  renderFormContainer = () => {
    const {firstNameError, lastNameError} = this.state

    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <div className="input-element">{this.renderFirstName()}</div>
        {firstNameError && <p className="error-message">Required</p>}
        <div className="input-element">{this.renderLastName()}</div>
        {lastNameError && <p className="error-message">Required</p>}
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    )
  }

  onClickResubmit = () =>
    this.setState({isFormSubmitted: false, firstName: '', lastName: ''})

  renderSuccessContainer = () => (
    <div className="success-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success logo"
        className="success-image"
      />
      <p className="success-heading">Submitted Successfully</p>
      <button type="button" className="resubmit" onClick={this.onClickResubmit}>
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {
      firstName,
      lastName,
      firstNameError,
      lastNameError,
      isFormSubmitted,
    } = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Registration</h1>
        <div className="box-container">
          {isFormSubmitted
            ? this.renderSuccessContainer()
            : this.renderFormContainer()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
