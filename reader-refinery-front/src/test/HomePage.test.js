import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders login page", () => {
    renderAuthProvider(<HomePage />)
    const text1 = screen.getByText('Browse all books');
    expect(text1).toBeInTheDocument();
})
