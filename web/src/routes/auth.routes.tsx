import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "../pages/Signin/Signin";

export function AppAuth() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signin />} />
            </Routes>
      </BrowserRouter>
  
    )
}