import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import DeleteConfirmation from "../components/deleteconfirmation";

const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders register page", () => {
    renderAuthProvider(<DeleteConfirmation />)
    const text1 = screen.getByText('Are you sure you want to delete your account?');
    expect(text1).toBeInTheDocument();
})
