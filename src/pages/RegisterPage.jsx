import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../services/helper";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  async function registerUser(event, response) {
    event.preventDefault();
    if (name === "" || email === "" || password === "") {
      alert("Please fill all fields");
    } else {
      // setButtonLoading(true);
      try {
        await axios.post(`${BASE_URL}/register`, {
          name,
          email,
          password,
        });
        console.log(name);
        setRedirect(true);
      } catch (e) {
        console.log(e);
        alert("Registration failed. Please try again later");
        // setButtonLoading(false);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32">
          <h1 className="text-4xl text-center mb-6">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Dhaval Dudheliya"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {/* <Link to={"/login"}> */}
            <button className="primary">
              <p>Register</p>
            </button>
            {/* </Link> */}
            <div className="text-center text-gray-500">
              <p>
                Already a member?{" "}
                <Link className="underline text-black" to={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
