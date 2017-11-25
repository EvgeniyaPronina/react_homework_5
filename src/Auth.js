import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authorizeUser } from './AuthorizeApi';

class Auth extends Component {
  state = {
    isAuthorized: false,
    email: '',
    password: '',
    showError: false
  };

  handleChange = e => {
    let inputVal = e.target.value;
    let inputName = e.target.name;
    this.setState(...this.state, { [inputName]: inputVal });
  };

  handleSubmit = () => {
    let { email, password } = this.state;
    let isCorrect = authorizeUser(email, password);
    this.setState({ isAuthorized: isCorrect });
    if (isCorrect === false) {
      this.setState({ showError: true });
    }
  };

  render() {
    const { isAuthorized, showError } = this.state;
    return (
      <div>
        <input type="text" name="email" onChange={this.handleChange} />
        <input type="text" name="password" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Авторизоваться</button>
        {isAuthorized === true ? <Redirect from="/private" to="/" /> : null}
        {showError ? (
          <p className="error">Имя пользователя или пароль введены неверно</p>
        ) : null}
      </div>
    );
  }
}

export default Auth;
