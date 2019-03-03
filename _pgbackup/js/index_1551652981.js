// https://github.com/lukejacksonn/hyperapp-firebase-auth

const { h, app } = hyperapp
const { firebaseAuth, FirebaseAuthDialog } = HyperappFirebaseAuth

const main =
  app(
    { auth: firebaseAuth.state },
    { auth: firebaseAuth.actions },
    (state, actions) =>
      h('main', {}, [
        // Only shows when NOT authenticated
        FirebaseAuthDialog(state.auth, actions.auth),
        // Only shows when authenticated
        state.auth.authed &&
         h('section', {}, [
           h('link', {}, 'https://dniprowood.github.io/erie'),
           h('p', {}, state.auth.user.email),
           h('button', { onclick: actions.auth.signout }, 'Sign Out'),
           h('button', {}, 'Show ERIE'),
         ]),
      ]),
    document.body
  )

firebase.auth().onAuthStateChanged(main.auth.userChanged)