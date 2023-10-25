import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { BASE_URL } from "../services/helper";
// import { Loading } from "react-loading-dot";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [buttonLoding, setButtonLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(event, response) {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill all fields");
    } else {
      setButtonLoading(false);
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          email,
          password,
        });
        if (response.data) {
          setUser(response.data);
          alert("Login Succesfull");
          setButtonLoading(false);
          setRedirect(true);
        } else {
          alert("Login failed. Please try again later");
        }
      } catch (e) {
        alert("Login failed. Please try again later");
        setButtonLoading(false);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32">
          <h1 className="text-4xl text-center mb-6">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
            <button className="primary">
              {buttonLoding ? (
                <div className="h-100 w-100 overflow-hidden">
                  <Loading />
                </div>
              ) : (
                <p>Login</p>
              )}
            </button>
            <div className="text-center text-gray-500">
              <p>
                Don't have account yet?{" "}
                <Link className="underline text-black" to={"/register"}>
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
