import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ListFooter } from "./ListFooter";

describe("ListFooter", () => {
  it("renders fetch button for idle state", () => {
    const fetchMore = jest.fn();

    render(<ListFooter fetchMore={fetchMore} status="idle" />);

    const fetchDataButton = screen.getByRole("button", { name: /fetch data/i });

    userEvent.click(fetchDataButton);

    expect(fetchMore).toBeCalledTimes(1);
  });

  it("renders loader for pending state", () => {
    const fetchMore = jest.fn();

    render(<ListFooter fetchMore={fetchMore} status="pending" />);

    expect(screen.getByTestId("Loader")).toBeInTheDocument();
    expect(screen.getByText(/fetching people.../i)).toBeInTheDocument();
  });

  it("renders refetch button for failure state", () => {
    const fetchMore = jest.fn();

    render(<ListFooter fetchMore={fetchMore} status="rejected" />);

    expect(screen.getByText(/people fetching falied/i)).toBeInTheDocument();

    const refetchButton = screen.getByRole("button", { name: /retry fetch/i });

    userEvent.click(refetchButton);

    expect(fetchMore).toBeCalledTimes(1);
  });

  it("renders fetch more button for success state", () => {
    const fetchMore = jest.fn();

    render(<ListFooter fetchMore={fetchMore} status="resolved" />);

    const fetchMoreButton = screen.getByRole("button", { name: /fetch more/i });

    userEvent.click(fetchMoreButton);

    expect(fetchMore).toBeCalledTimes(1);
  });
});
