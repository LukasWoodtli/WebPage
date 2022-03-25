import data from "./timestamps.json";


export function getFileDates(markdownFileName: string) {
  return getFileDatesImps(data, markdownFileName);
}

function getFileDatesImps(datesFromGit: any, markdownFileName: string) {
  const d: string | undefined = Object.keys(datesFromGit).find((fileName: string) => markdownFileName.endsWith(fileName));

  if (!d) {
    throw {
      name: "File not found",
      message: `No dates found for file '${markdownFileName}'. Please update file with dates.`
    };
  }

  return datesFromGit[d];
}


export function getNeighbors(markdownFileName: string) {
  return getNeighborsImpl(data, markdownFileName);
}

function getNeighborsImpl(datesFromGit: any, markdownFileName: string) {

  let dates = Object.entries(datesFromGit).map(([name, dates]) => {
    // @ts-ignore
    return { name: name, created: dates.created };
  });
  dates = dates.filter((element) => {
    return element.name.endsWith(".md") && !element.name.includes("content/pages/");
  });
  dates.sort((a: any, b: any) => (a.created - b.created));
  const index = dates.findIndex((element: any) => (markdownFileName.endsWith(element.name)));
  if (index < 0) {
    return {
      previousPost: null,
      nextPost: null
    };
  }
  const previousPost = index === 0 ? null : dates[index - 1].name;
  const nextPost = index === dates.length - 1 ? null : dates[index + 1].name;
  return {
    previousPost: previousPost,
    nextPost: nextPost
  };
}
