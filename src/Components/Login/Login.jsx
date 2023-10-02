import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [sucess, setsucess] = useState("");
  const emailRef = useRef(null) 
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    
    //reset
    setRegisterError('');
    setsucess('')
    // set validation
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(result.user.emailVerified){
            setsucess("Login sucessfull");
        }
        else{
            alert('please verify your email')
        }
      })
      .catch((error) => {
        setRegisterError("Login failed");
        console.error(error);
      });
  };
  const handleForgetPassword = () =>{
       const email = emailRef.current.value;
       if(!email){
        console.log('please provide an email',email)
        return;
       }
       else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
       {
        console.log('please write a valid email')
        return;
       }
    //    send validation
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert('please check your Email')
    })
    .catch(error =>
        console.log(error))
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {registerError && (
              <h2 className="text-red-600">{registerError} </h2>
            )}
            {sucess && <p className="text-green-500">{sucess}</p>}
            <p>New to this website <Link to="/heroregister">please register </Link> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
