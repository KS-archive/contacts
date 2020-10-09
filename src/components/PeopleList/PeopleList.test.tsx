import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { personBuilder } from "mocks/Person";

import { PeopleList } from "./PeopleList";

const mockSize = 30;
const renderedCardsCount = 11;

describe("PeopleList", () => {
  const people = [...Array(mockSize)].map((_, i) => ({ ...personBuilder(), isSelected: i < 3 }));

  it("virtualizes cards outside of the screen", async () => {
    const selectCard = jest.fn();
    const deselectCard = jest.fn();

    render(<PeopleList people={people} selectCard={selectCard} deselectCard={deselectCard} />);

    const peopleCards = await screen.findAllByTestId("PersonInfo");

    expect(peopleCards.length).toBe(renderedCardsCount);
  });

  it("passes select and deselect functions to rendered cards", async () => {
    const selectCard = jest.fn();
    const deselectCard = jest.fn();

    render(<PeopleList people={people} selectCard={selectCard} deselectCard={deselectCard} />);

    const peopleCards = await screen.findAllByTestId("PersonInfo");

    const selectedCard = peopleCards[1];

    userEvent.click(selectedCard);

    expect(deselectCard).toBeCalledWith(people[1].id);
    expect(deselectCard).toBeCalledTimes(1);
    expect(selectCard).toBeCalledTimes(0);

    const deselectedCard = peopleCards[5];

    userEvent.click(deselectedCard);

    expect(selectCard).toBeCalledWith(people[5].id);
    expect(selectCard).toBeCalledTimes(1);
  });
});
