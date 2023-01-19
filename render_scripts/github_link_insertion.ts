import utils from "./utils.ts";


// Set paths
const htmlRootPath = "_site"; // location of rendered HTML files for GitHub link insertion
const htmlExclusions = ["_site/site_libs"];
const sourceRootPath = "."; // location of source files to link to from HTML files
const sourceExclusions = ["_site", ".quarto", "images", ".git"];

// Find rendered HTML files and source files
const htmlFilePaths =
  utils.deepFindHTMLFiles(htmlRootPath, htmlExclusions) || [];
const sourceFiles = utils.deepFindQuartoSourceFiles(
  sourceRootPath,
  sourceExclusions
) || { qmd: [], md: [], ipynb: [], rmd: [] };

// Prepare HTML for string replacement
const stringToReplace = "GH-6c622c2fa6a54817"; // placeholder set in _quarto.yml
const htmlPre = '<a class="nav-link" aria-label="Edit this page" href="';
const htmlPost = '">Edit this page</a>';
const htmlPostFallback = '">Edit on GitHub</a>';

// Match each HTML file to a source path and insert the GitHub link
let githubLink;
let replacementString;
for (const htmlFilePath of htmlFilePaths) {
  let sourcePath = utils.findSourcePathFromHtmlFilePath(
    htmlFilePath,
    htmlRootPath,
    sourceFiles,
    sourceRootPath
  );
  if (sourcePath) {
    // Insert GitHub link to source file
    if (sourcePath.charAt(0) === ".") sourcePath = sourcePath.slice(1);
    githubLink = `https://github.com/datascijedi/website/edit/main/${sourcePath}`;
    replacementString = htmlPre + githubLink + htmlPost;
  } else {
    // Use fallback link to repo root
    githubLink = `https://github.com/datascijedi/website`;
    replacementString = htmlPre + githubLink + htmlPostFallback;
  }
  const fileStringIn = Deno.readTextFileSync(htmlFilePath);
  const fileStringOut = fileStringIn.replace(
    stringToReplace,
    replacementString
  );
  Deno.writeTextFileSync(htmlFilePath, fileStringOut);
}
