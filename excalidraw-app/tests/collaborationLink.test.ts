import { getCollaborationLinkData, isCollaborationLink } from "../data/index";

describe("collaboration links", () => {
  it("treats an empty referrer as a regular page load", () => {
    expect(isCollaborationLink("")).toBe(false);
    expect(getCollaborationLinkData("")).toBe(null);
  });
});
