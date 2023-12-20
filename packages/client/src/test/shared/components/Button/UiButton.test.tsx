import { render } from "@testing-library/react";
import { UiButton } from "../../../../main/shared";

describe("UiButton component", () => {
  test("Rendered", () => {
    const { getByRole } = render(<UiButton>Click me</UiButton>);

    expect(getByRole("button")).toHaveTextContent("Click me");
  });
});
