import React, { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "~/lib/session";

export default function Login() {
  const router = useRouter();

  const login = api.session.login.useMutation({
    onSuccess() {
      void router.push("/profile");
    },
    onError(err) {
      setErrorMsg(err.message);
    },
  });

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div>
      <div className="login">
        <button
          onClick={function handleSubmit() {
            login.mutate({ username: "testuser", password: "testuser" });
          }}
        >
          Login
        </button>
        {!!errorMsg && errorMsg}
      </div>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(function ({ req }) {
  if (req.session.isLoggedIn) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}, sessionOptions);
