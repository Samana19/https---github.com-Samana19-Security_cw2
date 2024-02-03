import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders login page", () => {
    renderAuthProvider(<LoginPage />)
    const text1 = screen.getByText('Sign in to your account');
    expect(text1).toBeInTheDocument();
})
