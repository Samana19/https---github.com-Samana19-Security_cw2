import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/footer";

const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders register page", () => {
    renderAuthProvider(<Footer />)
    const text1 = screen.getByText('Terms');
    expect(text1).toBeInTheDocument();
})
