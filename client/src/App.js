import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Form from "./components/form"
import EmpInfo from "./components/empInfo"
import Update from "./components/update"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div class ="container">
            <div class="row">
              
                <EmpInfo/>
              
            </div>
          </div>
        } />
        <Route path="/addEmployee" element={<Form/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
