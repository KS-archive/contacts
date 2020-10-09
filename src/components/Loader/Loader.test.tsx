import React, { Ref } from "react";
import { render, screen } from "@testing-library/react";

import { Loader } from "./Loader";

describe("Loader", () => {
  it("renders without crash", () => {
    render(<Loader />);

    expect(screen.getByTestId("Loader")).toBeInTheDocument();
  });

  it("passes reference to native div element", () => {
    const ref: Ref<HTMLDivElement> = { current: null };

    render(<Loader ref={ref} />);

    expect(ref.current).toBeInTheDocument();
  });
});
