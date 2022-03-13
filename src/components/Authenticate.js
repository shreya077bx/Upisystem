/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { css, jsx } from "@emotion/react";
import firebase from './firebase';

class Authenticate extends React.Component {

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
                console.log("NOT Sent")
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
            <div className="create__user" css={CSS}>
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
        );
    }

}

const CSS = css`
  height: 85vh;
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
    margin-top: 20px;
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
    padding: 50px;
    margin: 0 auto;
    border-radius: 4px;
    color: white;
    font-family: "Roboto", sans-serif;
    width: 80%;
    max-width: 650px;

    .form__item {
      display: flex;
      flex-direction: column;
      padding: 5px;
      margin: 10px 0;

      .label {
        font-size: 20px;
      }

      .input {
        font-size: 18px;
        margin-top: 10px;
        padding: 5px;
        border-radius: 4px;
      }

      .submit {
        padding: 10px;
        text-transform: uppercase;
        border-radius: 4px;
        font-weight: 600;
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

export default Authenticate;