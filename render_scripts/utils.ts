/*
General utils
*/

function unixPathJoin(path1: string, path2: string) {
  const path1EndSlashFlag = path1.charAt(path1.length - 1) === "/";
  const path2StartSlashFlag = path2.charAt(0) === "/";
  let joinedPath;
  if (path1EndSlashFlag && path2StartSlashFlag) {
    joinedPath = path1 + path2.slice(1);
  } else if (path1EndSlashFlag || path2StartSlashFlag) {
    joinedPath = path1 + path2;
  } else if (path1 === ".") {
    joinedPath = path2;
  } else {
    joinedPath = path1 + "/" + path2;
  }
  return joinedPath;
}

/*
Deep search utils
*/

type QuartoSoureFiles = {
  qmd: string[];
  md: string[];
  ipynb: string[];
  rmd: string[];
};

function deepFindHTMLFiles(
  rootPath: string,
  directoryExclusions: string[]
) {
  const htmlFiles = [];
  // Short-circuit case if `rootPath` is a file
  if (
    Deno.statSync(rootPath).isFile &&
    rootPath.toLowerCase().endsWith(".html")
  ) {
    htmlFiles.push(rootPath);
    return htmlFiles;
  }
  // Deep search
  const directoryList = [rootPath];
  while (directoryList.length > 0) {
    const currentDirectory = directoryList.shift();
    if (!currentDirectory) {
      continue;
    }
    const directoryContents = Deno.readDirSync(currentDirectory);
    for (const entry of directoryContents) {
      if (entry.isFile) {
        if (entry.name.toLowerCase().endsWith(".html")) {
          htmlFiles.push(unixPathJoin(currentDirectory, entry.name));
        }
      } else if (entry.isDirectory) {
        const directoryPath = unixPathJoin(currentDirectory, entry.name);
        if (directoryExclusions.includes(directoryPath)) {
          continue;
        }
        directoryList.push(directoryPath);
      } else if (entry.isSymlink) {
        console.error("Error: Symlinks are not currently supported.");
      } else {
        console.error(
          `Error: Directory entry ${entry.name} not recognized as an HTML file, a directory, or a symlink.`
        );
      }
    }
  }
  return htmlFiles;
}

function deepFindQuartoSourceFiles(
  rootPath: string,
  directoryExclusions: string[]
) {
  const sourceFiles: QuartoSoureFiles = { qmd: [], md: [], ipynb: [], rmd: [] };
  // Short-circuit case if `rootPath` is a file
  if (Deno.statSync(rootPath).isFile) {
    if (rootPath.toLowerCase().endsWith(".qmd")) {
      sourceFiles.qmd.push(rootPath);
    }
    else if (rootPath.toLowerCase().endsWith(".md")) {
      sourceFiles.md.push(rootPath);
    }
    else if (rootPath.toLowerCase().endsWith(".ipynb")) {
      sourceFiles.ipynb.push(rootPath);
    }
    else if (rootPath.toLowerCase().endsWith(".rmd")) {
      sourceFiles.rmd.push(rootPath);
    }
    return sourceFiles;
  }
  // Deep search
  const directoryList = [rootPath];
  while (directoryList.length > 0) {
    const currentDirectory = directoryList.shift();
    if (!currentDirectory) {
      continue;
    }
    const directoryContents = Deno.readDirSync(currentDirectory);
    for (const entry of directoryContents) {
      if (entry.isFile) {
        if (entry.name.toLowerCase().endsWith(".qmd")) {
          sourceFiles.qmd.push(unixPathJoin(currentDirectory, entry.name));
        } else if (entry.name.toLowerCase().endsWith(".md")) {
          sourceFiles.md.push(unixPathJoin(currentDirectory, entry.name));
        } else if (entry.name.toLowerCase().endsWith(".ipynb")) {
          sourceFiles.ipynb.push(unixPathJoin(currentDirectory, entry.name));
        } else if (entry.name.toLowerCase().endsWith(".rmd")) {
          sourceFiles.rmd.push(unixPathJoin(currentDirectory, entry.name));
        }
      } else if (entry.isDirectory) {
        const directoryPath = unixPathJoin(currentDirectory, entry.name);
        if (directoryExclusions.includes(directoryPath)) {
          continue;
        }
        directoryList.push(directoryPath);
      } else if (entry.isSymlink) {
        console.error("Error: Symlinks not currently supported.");
      } else {
        console.error(
          `Error: Entry ${entry.name} not recognized as a file, a directory, or a symlink.`
        );
      }
    }
  }
  return sourceFiles;
}

function findSourcePathFromHtmlFilePath(
  htmlFilePath: string,
  htmlRootPath: string,
  sourceFiles: QuartoSoureFiles,
  sourceRootPath: string
) {
  const barehtmlFilePath = htmlFilePath.substring(
    htmlRootPath.length,
    htmlFilePath.length - 5
  );
  let sourcePath;
  const qmdPath = unixPathJoin(sourceRootPath, barehtmlFilePath + ".qmd");
  const mdPath = unixPathJoin(sourceRootPath, barehtmlFilePath + ".md");
  const ipynbPath = unixPathJoin(sourceRootPath, barehtmlFilePath + ".ipynb");
  const rmdPath = unixPathJoin(sourceRootPath, barehtmlFilePath + ".rmd");
  // The second clause in each if condition below accounts for paths formatted in different ways
  // E.g. './webinars' represents the same path as 'webinars'
  if (
    sourceFiles.qmd.includes(qmdPath) ||
    (sourceRootPath === "." && sourceFiles.qmd.includes(qmdPath.substring(2)))
  ) {
    sourcePath = qmdPath;
  } else if (
    sourceFiles.md.includes(mdPath) ||
    (sourceRootPath === "." && sourceFiles.md.includes(mdPath.substring(2)))
  ) {
    sourcePath = mdPath;
  } else if (
    sourceFiles.ipynb.includes(ipynbPath) ||
    (sourceRootPath === "." &&
      sourceFiles.ipynb.includes(ipynbPath.substring(2)))
  ) {
    sourcePath = ipynbPath;
  } else if (
    sourceFiles.rmd.includes(rmdPath) ||
    (sourceRootPath === "." && sourceFiles.rmd.includes(rmdPath.substring(2)))
  ) {
    sourcePath = rmdPath;
  } else {
    console.error(
      `Fallback case occurred in findSourcePathFromHtmlFilePath for path: ${unixPathJoin(
        sourceRootPath,
        barehtmlFilePath
      )}.`
    );
  }
  return sourcePath;
}

export default {
  unixPathJoin,
  deepFindHTMLFiles,
  deepFindQuartoSourceFiles,
  findSourcePathFromHtmlFilePath,
};
