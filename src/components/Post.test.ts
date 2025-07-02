import { render, screen } from "@testing-library/react";
import Posts from "./Posts";
import "@testing-library/jest-dom";

test("loads and displays greeting", async () => {
  // ARRANGE
  // render(<Posts />);

  // ACT
  await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toBeDisabled();
});
