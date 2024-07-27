import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";
import Home from "./components/home/Home";
import Header from "./components/header/Header";

const App = () => {
  return (
    <>
      <Header />
      <div className={styles["main-outlet"]}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
