import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./services/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  PrivateRoute,
} from "react-router-dom";
// import Dashboard from "./Dashboard"
// import PrivateRoute from "./PrivateRoute"
// import ForgotPassword from "./ForgotPassword"
// import UpdateProfile from "./UpdateProfile"

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Stories from "./components/Stories";

function App() {
  //! Create an account call -> not staying here
  // const auth = getAuth(app);
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  //   const signUp=()=>{

  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     console.log(user)
  //     alert("Successfully created an account")
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     // const errorMessage = error.message;
  //     alert(errorCode)
  //     // ..
  //   });
  //   }
  //   const signIn=()=>{
  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     console.log(user)
  //     console.log(userCredential)
  //     alert("Successfully signed in")
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     // const errorMessage = error.message;
  //     alert(errorCode)
  //   });
  // }

  // !
  // return (
  //   <div className="main">
  //     <div className="App">
  //      <input type={"email"} placeholder="pleace enter your email" onChange={(e)=> setEmail(e.target.value)}/>
  //      <input type={"password"} placeholder="please enter your password" onChange={(e)=> setPassword(e.target.value)}/>
  //      <button onClick={signUp}>Create Account</button>
  //      <button onClick={signIn}>Sign in</button>

  //     </div>
  //   </div>
  // );

  return (
    // <Container
    //   className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" }}
    // >
    <Router>
      <AuthProvider>
        <Routes>
          {/* <PrivateRoute exact path="/" component={Dashboard} />*/}
          <Route path="/stories" element={<Stories />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
        </Routes>
      </AuthProvider>
    </Router>
    // </Container>
  );
}

export default App;
