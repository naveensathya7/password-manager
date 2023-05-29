import './App.css'

import {Component} from 'react'

import {v4} from 'uuid'

class App extends Component {
  state = {
    passwordsList: [],
    isShow: false,
    username: '',
    password: '',
    website: '',
    searchInput: '',
  }

  /* renderPasswords=()=>{
        const{passwordsList}=this.state 
        const{}
        if(showPassword){
            return 
        }
    } */
  renderPasswordOrStar = password => {
    const {isShow} = this.state

    return isShow ? (
      <p>{password}</p>
    ) : (
      <img
        className="stars"
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
      />
    )
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(each => each.id !== id),
    }))
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  searchResult = event => {
    this.setState({searchInput: event.target.value})
  }

  addPassword = () => {
    const {username, password, website} = this.state
    const addNewPassword = {
      id: v4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, addNewPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  render() {
    const {passwordsList, password, username, website, searchInput} = this.state
    const newList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const count = newList.length
    console.log(password)

    return (
      <div className="bg-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="user-input-section">
          <img
            className="pw-img1"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <div className="input-card">
            <h1 className="heading1">Add New Password</h1>
            <form className="form-card">
              <div className="inputText">
                <img
                  className="icons"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                />
                <input
                  className="input-body"
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="inputText">
                <img
                  className="icons"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                />
                <input
                  className="input-body"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="inputText">
                <img
                  className="icons"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                />
                <input
                  className="input-body"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button
                onClick={this.addPassword}
                type="submit"
                className="add-button"
              >
                Add
              </button>
            </form>
          </div>
        </div>

        <div className="passwords-container">
          <div className="upperbody">
            <div className="header">
              <h1>Your Passwords</h1>
              <p className="password-count">{count}</p>
            </div>

            <div className="inputText searchbar">
              <img
                className="icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
              />
              <input
                className="input-body search-bar"
                type="search"
                placeholder="Search"
                onChange={this.searchResult}
              />
            </div>
          </div>
          <hr />
          <div className="passwords-list">
            <div className="checkbox-container">
              <input
                id="checkbox1"
                type="checkbox"
                onClick={this.toggleShowPassword}
              />
              <label htmlFor="checkbox1">Show Passwords</label>
            </div>
          </div>
          {newList.length > 0 ? (
            <ul className="password-list">
              {newList.map(eachPassword => (
                <li key={eachPassword.id} className="list-item">
                  <p className="name-icon">
                    {eachPassword.website.slice(0, 1).toUpperCase()}
                  </p>
                  <div>
                    <p>{eachPassword.website}</p>
                    <p>{eachPassword.username}</p>
                    {this.renderPasswordOrStar(eachPassword.password)}
                  </div>
                  <button
                    data-testid="delete"
                    onClick={() => this.deletePassword(eachPassword.id)}
                    type="button"
                    className="delete-btn"
                  >
                    <img
                      className="dlt-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-passwords-section">
              <img
                className="no-pw-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
