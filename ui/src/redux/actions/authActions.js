export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_SIGN_UP = 'REQUEST_SIGN_UP';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';



function login(email, password) {
  return {
    type: REQUEST_LOGIN,
    data: {
      email,
      password
    }
  };
}

function signUp(signUpData = {}) {
  return {
    type: REQUEST_SIGN_UP,
    data: signUpData
  };
}

function receiveAuth(user, token) {
  return {
    type: RECEIVE_AUTH,
    data: {
      user,
      token
    }
  };
}

export function requestLogin() {
  return (dispatch, getState) => {
    let { email, password } = getState().auth.login;
    dispatch(requestLogin(email, password));
    return client.login(email, password)
      .then(res => dispatch(receiveAuth(res.user, res.token)));
  }
}

export function requestSignUp() {
  return (dispatch, getState) => {
    let signUpData = getState().auth.signup.creds;
    dispatch(requestSignUp(signUpData));
    return client.register(signUpData)
      .then(res => dispatch(receiveAuth(res.user, res.token)));
  }
}


