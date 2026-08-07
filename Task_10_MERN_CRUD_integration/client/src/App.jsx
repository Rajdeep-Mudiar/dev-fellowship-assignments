import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import Users from "./Users";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
