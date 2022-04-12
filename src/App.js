import { BrowserRouter, useHistory } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import Header from "./Layouts/Header";
import PreLoader from "./Layouts/PreLoader";
import Sidebar from "./Layouts/Sidebar";
import Footer from "./Layouts/Footer";
// import "./App.css";
function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();
  if (user != null) {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          <PreLoader />
          <Header userDetails={user.user} />
          <Sidebar />
          <div className="mobile-menu-overlay" />
          <div className="main-container">
            <div className="xs-pd-20-10 pd-ltr-20">
              <AppLayout />
              <Footer />
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    );
  }
}
export default App;
