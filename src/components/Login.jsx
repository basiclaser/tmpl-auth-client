import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });

    console.log(JSON.stringify(object));
    console.log(import.meta.env)
    fetch(import.meta.env.VITE_AUTH_API+"/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data);
          navigate(`/my-feed`);
        } else {
          alert(data.message);
        }
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="text" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <button>Login</button>
    </form>
  );
}
