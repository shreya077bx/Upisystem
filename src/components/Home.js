/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { css, jsx } from "@emotion/react";
import image from "./images/bg_bggenerator_com.png";
import firebase from './firebase';
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptcha verified")
      }, defaultCountry: "IN"
    });
  }

  onSignInSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobnumber;
    console.log(phoneNumber)

    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP Sent")
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        console.log("OTP not Sent")
        // ...
      });
  }

  onSubmitOtp = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      this.props.isLogedin(JSON.stringify(user))
      this.setState({ isAuthenticated: !this.state.isAuthenticated })
      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log("error verifing")
      // ...
    });
  }

  render() {
    return (
      <div className="home" css={CSS}>
        <div className="banner">
          <div className="headline">
            <h1>Welcome to MiPay!</h1>
            <p>India's Trusted UPI payments portal...</p>
          </div>
          <div className="image">
            <i className="fa fa-university"></i>
          </div>
        </div>
        {this.state.isAuthenticated ? (
          <>
            <div className="services__banner">
              <h1>Our Services</h1>
              <a className="button" href="#services">
                <ion-icon name="chevron-down-circle"></ion-icon>
              </a>
            </div>
            <div className="services" id="services">
              <Link to="/create-account">
                <div className="item">
                  <div className="image">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="title">
                    <h3>Add Account</h3>
                  </div>
                </div>
              </Link>
              <Link to="/transfer">
                <div className="item">
                  <div className="image">
                    <i className="fas fa-rupee-sign"></i>
                  </div>
                  <div className="title">
                    <h3>Make Transaction</h3>
                  </div>
                </div>
              </Link>
              <Link to="/transactions-history">
                <div className="item">
                  <div className="image">
                    <i className="fas fa-history"></i>
                  </div>
                  <div className="title">
                    <h3>Transaction History</h3>
                  </div>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="create__user" css={CSSLogin}>
              <h1>Verify Your Account</h1>
              <form className="form" onSubmit={this.onSignInSubmit}>
                <div id="sign-in-button"></div>
                <div className="form__item">
                  <label className="label" htmlFor="mobnumber">
                    Mobile Number:
                  </label>
                  <input
                    type="number"
                    name="mobnumber"
                    className="input"
                    placeholder="Mobile Number"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form__item">
                  <button className="submit" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              <form className="form" onSubmit={this.onSubmitOtp}>
                <div className="form__item">
                  <label htmlFor="otp" className="label">
                    Enter OTP:
                  </label>
                  <input
                    type="number"
                    name="otp"
                    className="input"
                    placeholder="OTP"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form__item">
                  <button className="submit" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>

          </>
        )}

      </div>
    );
  }
}

const CSSLogin = css`
  height: calc(70vh - 1.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgb(72, 202, 228);
  background: linear-gradient(
    180deg,
    rgba(72, 202, 228, 1) 0%,
    rgba(173, 232, 244, 1) 50%,
    rgba(202, 240, 248, 1) 100%
  );

  h1 {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 20px;
    font-family: "Roboto", sans-serif;
    font-size: 3rem;
    color: var(--star-command-blue);
    text-decoration: underline;
  }

  @media screen and (max-width: 400px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--dark-cornflower-blue);
    padding: 10px;
    margin: 0 auto;
    border-radius: 2px;
    color: white;
    font-family: "Roboto", sans-serif;
    width: 80%;
    max-width: 650px;

    .form__item {
      display: flex;
      flex-direction: column;
      padding: 5px;
      margin: 10px 0;
      align-items: center;

      .label {
        font-size: 20px;
      }

      .input {
        font-size: 18px;
        margin-top: 10px;
        width:80%;
        padding: 5px;
        border-radius: 4px;
      }

      .submit {
        padding: 10px;
        text-transform: uppercase;
        border-radius: 10px;
        font-weight: 600;
        width:30%;
        background: var(--navy-blue);
        color: var(--powder-blue);
        transition: all 0.3s ease;
      }

      .submit:hover {
        background-color: var(--sky-blue-crayola);
        color: var(--navy-blue);
      }

      .submit:target {
        background-color: var(--blizzard-blue;);
      }
    }
  }

  @media screen and (max-width: 780px) {
    .form {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

const CSS = css`
  font-family: "Roboto", sans-serif;
  background: url(${image}) no-repeat,
    linear-gradient(
      180deg,
      rgba(72, 202, 228, 1) 0%,
      rgba(173, 232, 244, 1) 50%,
      rgba(202, 240, 248, 1) 100%
    );
  background-size: cover, cover;

  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 45vh;
    color: var(--navy-blue);

    .headline {
      margin-left: 100px;
      flex: 0.8;
      h1 {
        font-size: 38px;
        font-weight: 900;
      }
      p {
        color: var(--dark-cornflower-blue);
        font-size: 20px;
        font-weight: 500;
        text-decoration: underline;
      }
    }

    .image {
      position: absolute;
      right: 120px;
      i::before {
        font-size: 180px;
      }
    }
  }

  @media screen and (max-width: 780px) {
    .banner {
      flex-direction: column;
      justify-content: space-around;
      height: 100vh;

      .headline {
        margin-left: 10px;
        flex: unset;
        h1 {
          font-size: 56px;
        }
      }

      .image {
        position: unset;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .services__banner {
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background: rgba(255, 255, 255, 0.3);

    h1 {
      font-size: 78px;
      font-family: "Marck Script", cursive;
      color: var(--navy-blue);
    }
    a {
      color: var(--powder-blue);
      padding: 0px 2.5px;
      border-radius: 180px;
      background: var(--navy-blue);
      box-shadow: 1px 1px 25px 0px rgba(0, 0, 0, 0.75);
      -webkit-box-shadow: 1px 1px 25px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 1px 1px 25px 0px rgba(0, 0, 0, 0.75);
      transition: all 0.3s ease;

      :hover {
        color: var(--navy-blue);
        background: var(--power-blue);
        transform: scale(1.4);
        box-shadow: unset;
        -webkit-box-shadow: unset;
        -moz-box-shadow: unset;
      }

      ion-icon {
        padding-top: 3px;
        font-size: 50px;
      }
    }
  }

  .services {
    padding-top: 45px;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: space-around;

    a {
      height: 100%;
      display: flex;
      align-items: center;
      color: var(--powder-blue);
      padding: 10px 0;
      .item {
        height: 100%;
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background: rgb(0, 137, 164);
        background: linear-gradient(
          180deg,
          rgba(0, 137, 164, 1) 0%,
          rgba(80, 196, 220, 1) 50%,
          rgba(58, 205, 235, 1) 100%
        );
        border-radius: 4px;
        padding: 0 60px;
        transition: all 0.3s ease;

        .image {
          i::before {
            font-size: 130px;
            padding-left: 10px;
          }
        }

        .title {
          color: var(--navy-blue);
        }
      }

      .item:hover {
        transform: scale(1.01);
        box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
      }

      @media screen and (max-width: 1100px) {
        .item {
          width: 200px;
        }
      }
    }
  }
  @media screen and (max-width: 625px) {
    .services__banner {
      h1 {
        font-size: 58px;
      }
    }
    .services {
      height: 110vh;
      flex-direction: column;
      padding-bottom: 30px;

      a {
        width: 100%;
        max-width: 350px;
        justify-content: center;

        .item {
          width: 100%;
        }
      }
    }
  }
`;

export default Home;
