import { useState } from "react";
import auth from "../../Firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [registerError, setRegisterError] = useState("");
  const [sucess,setsucess] =useState ('');

  const hanleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setRegisterError('')
    setsucess('')
    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setsucess('Register sucessfull');
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div>
      <div className="mx-auto md:w-1/2 rounded-lg p-10 ">
        <h2 className="text-3xl mb-3">Please Signup</h2>
        <form onSubmit={hanleSubmit}>
          <input
            className="px-4 py-2 mb-3 w-3/4 rounded-lg"
            placeholder="Enter your Email"
            type="email"
            name="email"
            id="" required
          />
          {registerError && <p className="text-red-600">{registerError}</p>}
          <br />
          <input
            className="px-4 py-2 mb-3 w-3/4 rounded-lg"
            placeholder="Enter your Password"
            type="password"
            name="password"
            id=""
          />
          <br />
          <input
            className="px-4 py-2 mb-3 w-3/4 rounded-lg bg-pink-600"
            type="submit"
            value="Submit"
          />
        </form>
        {
            sucess && <p className="text-green-500">{sucess}</p>
        }
      </div>
    </div>
  );
};

export default SignUp;
