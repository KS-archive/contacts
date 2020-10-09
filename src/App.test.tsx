import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { personBuilder } from "mocks/Person";

import apiData from "./api";
import App from "./App";

const mockData = Array.from(Array(40).keys()).map(() => personBuilder());
const mockSize = 20;

jest.mock("./api");

describe("App", () => {
  let mockedApiCall: jest.Mock;
  let cursor = -1;

  beforeEach(() => {
    cursor = -1;

    mockedApiCall = (apiData as jest.Mock).mockImplementation(() => {
      cursor += 1;

      const start = cursor * mockSize;
      const end = cursor * mockSize + mockSize;

      return Promise.resolve(mockData.slice(start, end));
    });
  });

  it("triggers people fetching on first mount", async () => {
    render(<App />);

    expect(mockedApiCall).toBeCalledTimes(1);

    const peopleCards = await screen.findAllByTestId("PersonInfo");

    expect(peopleCards.length).toBeGreaterThan(0);
  });

  it("displays number of currently selected cards", async () => {
    render(<App />);

    const peopleCards = await screen.findAllByTestId("PersonInfo");

    userEvent.click(peopleCards[1]);
    userEvent.click(peopleCards[3]);
    userEvent.click(peopleCards[4]);

    expect(screen.getByText(/selected contacts: 3/i)).toBeInTheDocument();
  });

  it("moves selected cards to the top", async () => {
    render(<App />);

    const initialCards = await screen.findAllByTestId("PersonInfo");

    userEvent.click(initialCards[1]);
    userEvent.click(initialCards[4]);

    const cardsAfterSelect = await screen.findAllByTestId("PersonInfo");

    expect(cardsAfterSelect[0]).toEqual(initialCards[1]);
    expect(cardsAfterSelect[1]).toEqual(initialCards[4]);
    expect(cardsAfterSelect[2]).toEqual(initialCards[0]);

    userEvent.click(initialCards[1]);

    const cardsAfterDeselect = await screen.findAllByTestId("PersonInfo");

    expect(cardsAfterDeselect[0]).toEqual(initialCards[4]);
    expect(cardsAfterDeselect[1]).toEqual(initialCards[0]);
    expect(cardsAfterDeselect[2]).toEqual(initialCards[1]);
  });
});
