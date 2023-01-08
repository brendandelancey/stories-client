import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
   
    try {
      
      setError("");
      setLoading(true);
      login(emailRef.current.value, passwordRef.current.value);
      console.log("************************");
      navigate("stories");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need anrmfv kvfkm rrfmkvrf account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
}

// import { signInWithEmailAndPassword } from "firebase/auth";

// import {auth} from '../utils/firebase'
// import React, {  useState } from "react";

// function Login() {
// const [email, setEmail] = useState("")
// const [password, setPassword] = useState("")

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
// const signOut=()=>{
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });}

//   return (
//     <div className="main">
//       <div className="App">
//        <input type={"email"} placeholder="pleace enter your email" onChange={(e)=> setEmail(e.target.value)}/>
//        <input type={"password"} placeholder="please enter your password" onChange={(e)=> setPassword(e.target.value)}/>

//        <button onClick={signIn}>Sign in</button>
//        <button onClick={signOut}>Sign out</button>
//       </div>
//     </div>
//   );
// }

// export default Login;
