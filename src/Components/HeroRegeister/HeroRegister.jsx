import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";

const HeroRegister = () => {
    const [registerError,setRegisterError] =useState('')
    const [sucess,setsucess] =useState('')
    const handleSubmit = e =>{
        e.preventDefault();

        const email =e.target.email.value;
        const password =e.target.password.value;
        console.log(email,password);
        if(password.length <6){
            setRegisterError('The password must be 6 charector')
        }
        else if(!/A-Z/.test(password)){
            setRegisterError("passwora must have uppercase")
        }
        setRegisterError('');
        setsucess('')
        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            setsucess("user Create sucessfull")
        })
        .catch(error =>{
            console.error(error);
            setRegisterError(error.message)
        })
    }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register Now</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email" name="email"
                    className="input input-bordered" required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password" name="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
              {
                registerError && <h2 className="text-red-600">{registerError} </h2>
              }
              {
                sucess && <p className="text-green-500">{sucess}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
