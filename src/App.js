import "./App.css";
import Signup from "./signup/signup";
import Login from "./login/login";
import Dashboard from "./dashboard/Dashboard";
import ComfirmPage from "./signup/ComfirmPage";
import DashBoard from "./dashboard/Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./dashboard/profile/Profile";
import AddProduct from "./dashboard/addProduct/AddProduct";
import Cart from "./dashboard/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/comfirmnote" component={ComfirmPage} />
          <Route path="/dashboard" component={DashBoard} />{" "}
          <Route path="/profile" component={Profile} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
