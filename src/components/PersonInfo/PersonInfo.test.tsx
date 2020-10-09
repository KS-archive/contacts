import React, { Ref } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { personBuilder } from "mocks/Person";

import { PersonInfo } from "./PersonInfo";

describe("PersonInfo", () => {
  const person = personBuilder();

  it("renders person card with all passed properties", () => {
    const handleClick = jest.fn();

    render(<PersonInfo data={person} onClick={handleClick} />);

    expect(screen.getByTestId("PersonInfo")).toBeInTheDocument();
    expect(screen.getByText(person.firstNameLastName)).toBeInTheDocument();
    expect(screen.getByText(person.jobTitle)).toBeInTheDocument();
    expect(screen.getByText(person.emailAddress)).toBeInTheDocument();
  });

  it("reacts to click event and passes card id as an argument", () => {
    const handleClick = jest.fn();

    render(<PersonInfo data={person} onClick={handleClick} />);

    const personInfo = screen.getByTestId("PersonInfo");

    userEvent.click(personInfo);

    expect(handleClick).toBeCalledWith(person.id);
    expect(handleClick).toBeCalledTimes(1);
  });

  it("is focusable", () => {
    const ref: Ref<HTMLButtonElement> = { current: null };
    const handleClick = jest.fn();

    render(<PersonInfo data={person} onClick={handleClick} ref={ref} />);

    ref.current?.focus();

    const personInfo = screen.getByTestId("PersonInfo");

    expect(personInfo).toHaveFocus();
  });
});
