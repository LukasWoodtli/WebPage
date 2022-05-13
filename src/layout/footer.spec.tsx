import React from "react"
import { render, screen } from "@testing-library/react"
import Footer from "./footer";

test("Displays the correct title", () => {
  const index = render(<Footer  style={{}}/>)
  const element = screen.getAllByTestId('footer-icon')
  expect(element.length).toBe(4);
})
