import { render,screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import UserProfile from "../pages/UserProfile";

const renderAuthProvider = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  );
};

test("renders login page", () => {
    renderAuthProvider(<UserProfile />)
    const text1 = screen.getByText('User Profile');
    expect(text1).toBeInTheDocument();
})
