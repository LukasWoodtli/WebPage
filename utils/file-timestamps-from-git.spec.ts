import { getFileDates, getNeighbors } from "./file-timestamps-from-git";


describe("Combine file information with dates", () => {

  it("successful", () => {
    const filePath = "/foo/bar/content/arm_stack_frame.md";
    const datesFromGit = getFileDates(filePath);
    expect(datesFromGit.created).toEqual(1442779935);
    expect(datesFromGit.modified).toEqual(1649450365);

  });
  it("unsuccessful", () => {
    const file = "/foo/bar/baz";
    expect(() => getFileDates(file))
      .toThrowError("No dates found for file '/foo/bar/baz'. Please update file with dates: npm run generate-dates-file");
  });

  it("gets correct neighbors for first entry", () => {
    const neighbors = getNeighbors("content/modern_os.md");
    expect(neighbors.previousPath).toBeNull();
    expect(neighbors.nextPath).toEqual("content/sql_introduction.md");
  });

  it("gets correct neighbors for middle entry", () => {
    const neighbors = getNeighbors("content/comparison_rotation_body_motion.md");
    expect(neighbors.previousPath).toEqual("content/wrenches.md");
    expect(neighbors.nextPath).toEqual("content/evaluation_strategy.md");
  });

  it("gets correct neighbors for last entry", () => {
    const neighbors = getNeighbors("content/odbc_postgres.md");
    expect(neighbors.previousPath).toEqual("content/si_units.md");
    expect(neighbors.nextPath).toEqual("content/bsd_socket_api.md");
  });
});
