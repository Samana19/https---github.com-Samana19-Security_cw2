import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import BookShelf from "../components/bookshelf";

const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders register page", () => {
    renderAuthProvider(<BookShelf />)
    const text1 = screen.getByText('View Details');
    expect(text1).toBeInTheDocument();
})
