// Inserts source file GitHub links into the rendered HTML files

// Get HTML files
const sitemapString = Deno.readTextFileSync('./_site/sitemap.xml');
const htmlUrlRegex = new RegExp('https://.*\.html', 'ig');
const htmlUrlList = sitemapString.matchAll(htmlUrlRegex);
// Loop through and insert GitHub links
for (const url of htmlUrlList) {
  const outputHtmlPath = url[0].replace('https://datascijedi.netlify.app', '_site');
  // Link to source file whenever possible
  const qmdPath = outputHtmlPath.replace('_site', '.').replace('.html', '.qmd');
  const qmdExists = checkSourceExistence(qmdPath);
  if (qmdExists) {
    replaceGitHubPlaceholder(qmdPath, outputHtmlPath);
    continue;
  }
  const mdPath = qmdPath.replace('.qmd', '.md');
  const mdExists = checkSourceExistence(mdPath);
  if (mdExists) {
    replaceGitHubPlaceholder(mdPath, outputHtmlPath);
    continue;
  }
  const ipynbPath = qmdPath.replace('.qmd', '.ipynb');
  const ipynbExists = checkSourceExistence(ipynbPath);
  if (ipynbExists) {
    replaceGitHubPlaceholder(ipynbPath, outputHtmlPath);
    continue;
  }
  const rmdPath = qmdPath.replace('.qmd', '.rmd');
  const rmdExists = checkSourceExistence(rmdPath);
  if (rmdExists) {
    replaceGitHubPlaceholder(rmdPath, outputHtmlPath);
    continue;
  }
  // If we reach here a source file was not found, so we link to the GitHub repo root
  replaceGitHubPlaceholder('', outputHtmlPath);
}

// Helper functions

function checkSourceExistence(sourcePath: string) {
  let sourceExists;
  try {
    sourceExists = Deno.statSync(sourcePath);
  }
  catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      sourceExists = false;
    }
    else {
      console.error("An unexpected error occurred during GitHub link insertion: " + error);
    }
  }
  return sourceExists;
}

function replaceGitHubPlaceholder(sourcePath: string, outputHtmlPath: string) {
  // Prepare HTML for string replacement
  const stringToReplace = "GH-6c622c2fa6a54817"; // Placeholder set in _quarto.yml
  const htmlPre = '<a class="nav-link" aria-label="Edit this Page" href="';
  const htmlPreFallback = '<a class="nav-link" aria-label="Edit on GitHub" href="';
  const htmlPost = '">Edit this Page</a>';
  const htmlPostFallback = '">Edit on GitHub</a>';
  // Make the replacement
  let replacementString;
  if (sourcePath) {
    // Insert GitHub link to source file
    const githubLink = `https://github.com/datascijedi/website/edit/main/${sourcePath.slice(1)}`;
    replacementString = htmlPre + githubLink + htmlPost;
  } else {
    // Use fallback link to repo root
    const githubLink = `https://github.com/datascijedi/website`;
    replacementString = htmlPreFallback + githubLink + htmlPostFallback;
  }
  const fileStringIn = Deno.readTextFileSync(outputHtmlPath);
  const fileStringOut = fileStringIn.replace(stringToReplace, replacementString);
  Deno.writeTextFileSync(outputHtmlPath, fileStringOut);
}
