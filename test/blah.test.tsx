import React from "react";
import * as ReactDOM from "react-dom";
import { Accordion } from "../src/lib";

describe("Thing", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Accordion children={<p>HI</p>} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
