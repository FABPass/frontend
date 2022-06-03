import React from 'react';
import ReactDOM from "react-dom";
import {render, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import {GeneratePassword} from "../GeneratePassword";

afterAll(cleanup);


it("Kreiranje generate password forme", ()=>{
    const div = document.createElement("div")
    ReactDOM.render(<GeneratePassword></GeneratePassword>, div)
});

it("Kreiranje copy password inputa", ()=>{
    const {getByTestId} = render(<GeneratePassword></GeneratePassword>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("genpw-copy-input")).toHaveTextContent("")
});

it("Kreiranje copy password button-a", ()=>{
    const {getByTestId} = render(<GeneratePassword></GeneratePassword>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("genpw-copy-btn")).toHaveTextContent("Copy password")
});

it("Kreiranje length inputa", ()=>{
    const {getByTestId} = render(<GeneratePassword></GeneratePassword>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("genpw-pwlength-input")).toHaveValue(5)
});

it("Kreiranje generate password button-a", ()=>{
    const {getByTestId} = render(<GeneratePassword></GeneratePassword>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("genpw-generatepw-btn")).toHaveTextContent("Generate password")
});