import React from 'react';
import ReactDOM from "react-dom";
import {Profile} from "../Profile";
import {render, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

afterAll(cleanup);

it("Kreiranje profile forme", ()=>{
    const div = document.createElement("div")
    ReactDOM.render(<Profile></Profile>, div)
});

it("Kreiranje profile first name inputa", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-fname-input")).toHaveTextContent("")
});

it("Kreiranje profile last name inputa", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-lname-input")).toHaveTextContent("")
});

it("Kreiranje profile email inputa", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-email-input")).toHaveTextContent("")
});

it("Kreiranje profile phone inputa", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-phone-input")).toHaveTextContent("")
});

it("Kreiranje profile old pw inputa", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-oldpw-input")).toHaveTextContent("")
});

it("Kreiranje profile new pw inputa", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-newpw-input")).toHaveTextContent("")
});

it("Kreiranje profile repeat new pw inputa", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-repeatnewpw-input")).toHaveTextContent("")
});

it("Kreiranje profile save button-a", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-savebtn")).toHaveTextContent("Save")
});

it("Kreiranje profile cancel button-a", ()=>{
    const {getByTestId} = render(<Profile></Profile>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("p-cancelbtn")).toHaveTextContent("Cancel")
});

