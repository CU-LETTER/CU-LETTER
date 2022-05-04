import React, { useEffect } from "react";
import Router from "next/router";

function logout() {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    Router.push("/login");
  }, []);

  return <></>;
}

export default logout;
