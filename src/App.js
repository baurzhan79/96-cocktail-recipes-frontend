import React from "react";
import { useSelector } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import AllRoutes from "./AllRoutes";

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar user={user} />
      </header>
      <main>
        <Container maxWidth="xl">
          <AllRoutes user={user} />
        </Container>
      </main>
    </>
  );
};

export default App;