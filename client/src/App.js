import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Form from "./components/form"
import EmpInfo from "./components/empInfo"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div class ="container">
            <div class="row">
              <div class="col-md-6">
                <Form/>
              </div>
              <div class="col-md-6">
                <EmpInfo/>
              </div>
            </div>
          </div>
        } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
