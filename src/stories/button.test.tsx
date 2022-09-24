import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Button.stories"; // import all stories from stories file

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { Primary, Secondary } = composeStories(stories);

// test("renders primary button with default args", () => {
//   render(<Primary/>);
//   const buttonElement = screen.getByText(/Text coming from args in stories file!/i);
//   expect(buttonElement).not.toBeNull();
// });
// => TestingLibraryElementError: Unable to find an element with the text: /Text coming from args in stories file!/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

test("renders primary button with overriden props", () => {
  render(<Primary label="Hello world"/>); // you can override props and they will get merged with values from the Story's args
  const buttonElement = screen.getByText(/Hello world/i);
  expect(buttonElement).not.toBeNull();
});

test('onclick handler is called', () => {
  const onClickSpy = jest.fn();
  render(<Primary onClick={onClickSpy} />);
  const buttonElement = screen.getByRole('button');
  buttonElement.click();
  expect(onClickSpy).toHaveBeenCalled();
});

test('reuses args from composed story', () => {
  render(<Primary />);

  const buttonElement = screen.getByRole('button');
  // Testing against values coming from the story itself! No need for duplication
  expect(buttonElement.textContent).toEqual(Primary.args?.label);
});
