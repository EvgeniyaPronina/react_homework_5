import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authorizeUser, isAuthorized } from './AuthorizeApi';

class Auth extends Component {
  state = {
    isAuthorized: isAuthorized,
    email: '',
    password: '',
    showError: false
  };

  handleChange = e => {
    let inputVal = e.target.value;
    let inputName = e.target.name;
    this.setState({ [inputName]: inputVal });
  };

  handleSubmit = () => {
    let { email, password } = this.state;
    let isCorrect = authorizeUser(email, password);
    isCorrect ? this.setState({ isAuthorized: true }): this.setState({ showError: true })
  };

  render() {
    const {  showError, isAuthorized } = this.state;

      return (
      <div>
          {isAuthorized === true
              ? <Redirect from="/auth" to="/" />
              : <form>
            <input type="text" name="email" onChange={this.handleChange} />
            <input type="text" name="password" onChange={this.handleChange} />
            <button onClick={this.handleSubmit}>Авторизоваться</button>
              {showError && <p className="error">Имя пользователя или пароль введены неверно</p> }
          </form>
          }
      </div>
    );
  }
}

export default Auth;
