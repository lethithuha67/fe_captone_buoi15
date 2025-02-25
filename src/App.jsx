import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./template/Layout";
import Home from "./Page/home/Home";
import Details from "./Page/Details/Details";
import Addimages from "./Page/Addimages/Addimages";
import Edit from "./Page/Edit/Edit";
import AuthForm from "./Page/AuthForm/AuthForm";
import RegisterForm from "./Page/RegisterForm/RegisterForm";
import MyImages from "./Page/MyImages/MyImages";

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout main={<Home />} />} />
          <Route path="/details/:id" element={<Layout main={<Details />} />} />
          <Route path="/addimages" element={<Layout main={<Addimages />} />} />
          <Route path="/edit/:id" element={<Layout main={<Edit />} />} />
          <Route path="/authform" element={<Layout main={<AuthForm />} />} />
          <Route path="/myimages" element={<Layout main={<MyImages />} />} />
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
