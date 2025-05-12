import React from "react";
import { signIn, signOut } from "@dbcdk/login-nextjs/client";
import styles from "@/components/Header.module.css";
import { Button, Navbar } from "react-bootstrap";

export const Header = ({ session }) => {
  // This could probably be done inline as well, however it causes rendering issues with next-auth login
  const onSignInOut = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <Navbar bsPrefix={styles.container} sticky={"top"} bg={"black"}>
      <Navbar.Brand>
        <img
          className={styles.logo}
          width={90}
          src="/logo.png"
          alt="DBCs Posthus"
        />
        <span className={styles.greeting}>
          DBCs Posthus {session && " - " + session.user.netpunktAgency}
        </span>
      </Navbar.Brand>
      <Navbar.Text className={styles.button}>
        <div className={styles.navArea}>
          <Button data-cy="navigation-login-button" onClick={onSignInOut}>
            {session ? "Log ud" : "Log ind"}
          </Button>
        </div>
      </Navbar.Text>
    </Navbar>
  );
};

export default Header;
