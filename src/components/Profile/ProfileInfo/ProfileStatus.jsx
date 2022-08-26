import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="Sovet-Book.it" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Sovet-Book.it");
  });
  test("after creation span should be displayed", async () => {
    const component = create(<ProfileStatus status="Sovet-Book.it" />);
    const root = component.root;
    let span = await root.findByType('span')
    expect(span).not.toBeNull();
  });
  test("after creation span should be displayed with correct status", async () => {
    const component = create(<ProfileStatus status="Sovet-Book.it" />);
    const root = component.root;
    let span = await root.findByType('span')
    expect(span.children[0]).toBe("Sovet-Book.it");
  });
  test("input editMode", async () => {
    const component = create(<ProfileStatus status="Sovet-Book.it" />);
    const root = component.root;
    let span = await root.findByType('span')
    span.props.onDoubleClick()
    let input  = await root.findByType('input')
    expect(input.props.value).toBe("Sovet-Book.it");
  });
  test("callback should be called",  () => {
    const mockCallback = jest.fn()
    const component = create(<ProfileStatus updateUserStatus={mockCallback} status="Sovet-Book.it" />);
    const instance = component.getInstance();
    instance.deactivateEditMode()

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});