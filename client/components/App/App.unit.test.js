import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";

import App from "./App.jsx";
import BookingBar from "../Booking/Bar/Bar.jsx";

describe("App", () => {
  test("renders properly", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("contains booking bar", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(BookingBar)).toHaveLength(1);
  });
});

describe("Addition", () => {
  test("1 + 1 equals 2", () => {
    expect(1 + 1).toBe(2);
  });
});