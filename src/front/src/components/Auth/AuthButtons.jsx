import React from "react";
import { Button } from "../Button/Button";

const AuthButtons = ({ setShowLogin, setShowRegister }) => (
  <>
    <Button className="" onClick={() => setShowLogin(true)}>
      Entrar
    </Button>
    <Button
      className="bg-fuchsia-600 border-fuchsia-500 hover:text-fuchsia-500  ml-2"
      onClick={() => setShowRegister(true)}
    >
      Registrar
    </Button>
  </>
);

export default AuthButtons;
