import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./template/Layout";
import Home from "./Page/home/Home";
import Details from "./Page/Details/Details";
import Addimages from "./Page/Addimages/Addimages";
import Edit from "./Page/Edit/Edit";
import AuthForm from "./Page/AuthForm/AuthForm";
import RegisterForm from "./Page/RegisterForm/RegisterForm";

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout main={<Home />} />} />
          <Route path="/details" element={<Layout main={<Details />} />} />
          <Route path="/addimages" element={<Layout main={<Addimages />} />} />
          <Route path="/edit" element={<Layout main={<Edit />} />} />
          <Route path="/authform" element={<Layout main={<AuthForm />} />} />
          <Route
            path="/registerform"
            element={<Layout main={<RegisterForm />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
