import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import BookDetails from "../pages/BookDetails";

const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders login page", () => {
    renderAuthProvider(<BookDetails />)
    const text1 = screen.getByText('No reviews available.');
    expect(text1).toBeInTheDocument();
})
