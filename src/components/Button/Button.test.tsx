import React, { Ref } from "react";
import { render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () => {
  it("renders without crash", () => {
    render(<Button>Fetch more</Button>);

    expect(screen.getByRole("button", { name: /fetch more/i })).toBeInTheDocument();
  });

  it("passes reference to native button element", () => {
    const ref: Ref<HTMLButtonElement> = { current: null };

    render(<Button ref={ref}>Fetch more</Button>);

    expect(screen.getByRole("button", { name: /fetch more/i })).toBeInTheDocument();
  });
});
