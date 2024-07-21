import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInPage, SignUpPage } from "./Routes";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
