import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import AddBookPage from "../components/feedbox";

const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders register page", () => {
    renderAuthProvider(<AddBookPage />)
    const text1 = screen.getByText('Add a New Book');
    expect(text1).toBeInTheDocument();
})
