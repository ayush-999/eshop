import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInPage, SignUpPage, ActivationPage } from "./Routes";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
