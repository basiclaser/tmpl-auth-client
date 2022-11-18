import { useEffect, useState } from "react";

export default function MyFeed({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("user is available, getting messages..");

      //   const jwt = localStorage["user-jwt"];
      //   if (jwt) {
      //     fetch(import.meta.env.VITE_AUTH_API/users/me", {
      //       headers: {
      //         Authorization: `Bearer ${JSON.parse(jwt)}`,
      //       },
      //     })
      //       .then((res) => res.json())
      //       .then((data) => {
      //         console.log(data);
      //         if (data.success) {
      //           console.log(data.data);
      //         }
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   }

      fetch(import.meta.env.VITE_MSG_API, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage["user-jwt"])}`,
        },
      })
        .then((res) => res.json())
        .then((messages) => setMessages(messages.data))
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <div>
      {messages.map((message) => (
        <div key={message._id}>
          <p>
            to: {message.to} <br />
            message: {message.message}
          </p>
        </div>
      ))}
    </div>
  );
}
