import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/usernavbar";
const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders register page", () => {
    renderAuthProvider(<Navbar />)
    const text1 = screen.getByText('Welcome User!');
    expect(text1).toBeInTheDocument();
})
