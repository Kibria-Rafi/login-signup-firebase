import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const HeroRegister = () => {
    const [registerError,setRegisterError] =useState('')
    const [sucess,setsucess] =useState('')
    const [showPassword,setShowPassword] = useState(false);
    const handleSubmit = e =>{
        e.preventDefault();
        const name =e.target.name.value;
        const email =e.target.email.value;
        const password =e.target.password.value;
        const accepted = e.target.checkbox.checked;
        console.log(email,password ,accepted,name);
        if(password.length <6){
            setRegisterError('The password must be 6 charector')
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError("passwora must have uppercase")
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and condition');
            return;
        }
        //reset
        setRegisterError('');
        setsucess('')
        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            setsucess("user Create sucessfull")
            // update profile
            updateProfile(result.user,{
              displayName:name,
              
            })
            .then(()=> console.log('profile Updated'))
            .catch(error=> console.error(error))
            // sent verification
            sendEmailVerification(result.user)
            .then(()=>{
                alert('plase check your email and verify your account')
            })
            
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
            <h1 className="text-5xl font-bold">SignUp Now</h1>
            <p className="py-6">
              add your Email and set your secreat password
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <span>Your name</span>
                  <input
                  
                    type="text"
                    placeholder="Your name" name="name"
                    className="input input-bordered" required
                  />
                  <br />
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
                    type={showPassword ?"text" :"password"}
                    placeholder="password"
                     name="password"
                    className="input input-bordered"
                  />
                  <span className="absulate mb-3 ms-72 mt-[-32px]" onClick={()=> setShowPassword(!showPassword)}>
                    {
                        showPassword ? <FaEyeSlash></FaEyeSlash> :<FaEye></FaEye>
                    }
                  </span>
                  <div className="flex gap-2"> 
                  <input type="checkbox" name="checkbox" id="terms" />
                  <label htmlFor="terms">Accept Our terms and condition</label>
                  </div>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Sign up</button>
                </div>
              </form>
              {
                registerError && <h2 className="text-red-600">{registerError} </h2>
              }
              {
                sucess && <p className="text-green-500">{sucess}</p>
              }
              <p>Already hava an account? <Link to="/login">Please Log in.</Link> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
