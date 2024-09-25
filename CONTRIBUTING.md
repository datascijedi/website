# Contributing

We welcome and value contributions from everyone. Contributions can include adding website content, making or suggesting a fix, or developing new website features. Hope to see you around! 

## Table of Contents

- [Introduction](#introduction)
- [Content Edits](#content-edits)
  - [Adding Links](#adding-links)
  - [Updating Resources](#updating-resources)
  - [Updating Webinars](#updating-webinars)
  - [JEDI Corner](#jedi-corner)
  - [Accessibility Tips](#accessibility-tips)
- [Development Setup](#development-setup)
  - [Codespaces](#codespaces)
  - [Local Development](#local-development)
  - [Project IDX](#project-idx)
  - [Quarto Upgrade and Deployment](#quarto_version_and_deployment)
- [JEDI Membership](#jedi-membership)

## Introduction

To contribute code or content, just submit a pull request against the `main` branch! If you are embarking on a larger effort or just want to let us know of an issue, consider creating a GiHub issue as well. 

If you're using R Studio or prefer a GUI-based approach, check out [this recording](https://drive.google.com/file/d/1tYgy2J9Yne-YX4c1JdHnQLGTgK3G2wAc/view?usp=sharing) from a Communications Committee meeting that demostrates two approaches to starting a pull request and requesting a merge. Otherwise, head over to the "Development Setup" section of this guide for various other options.

## Content Edits

### Adding Links

When inserting links anywhere on the site, use a clear label describing the purpose of the link. This makes the website more accessible for viewers using screen readers (among other accecsibility benefits). [Read more about Accesible Rich Interner Applications at this link.](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8#:~:text=The%20aria%2Dlabel%20attribute%20provides,used%20instead%20of%20aria%2Dlabel%20)

### Updating Resources

For adding links to Resources tab, open the resources.qmd file (in the "main" folder). Click the pencil icon to edit the file. Copy the formatting for other links, that is putting the text description within brackets and website within parentheses. Leave a vertical space between each bullet point resource. Commit changes to save. 

### Updating Webinars

#### Upcoming webinars

For adding information on upcoming webinars, use the following stpes:

1) Add webinar image or flyer to website/webinars/images. Note, pdf flyers are not ideal; they don't display well. png or jpg are preferred.
2) Copy content of dummy-webinar.qmd from website/webinars
3) Create new .qmd file in website/webinars/upcoming, paste dummy-webinar content, and edit all available fields.
4) If necessary, update website/webinars.qmd to replace "Coming soon" message, display upcoming webinars. Use <!-- at the start of Coming soon message and --> at end to supress. Remove #s on listing content to show upcoming webinars (lines 4-8). (Ensure proper spacing, look at past webinars list for example.) Remove <!-- and --> around :::{#upcoming webinars} ::: 
5) If necessary, update index.qmd to display upcoming webinars instead of past webinars. To do this, change content from webinars/past to webinars/upcoming

#### Past webinars

When a webinar has occurred, use the following steps to move it to past webinar list, update home page, and remove it from upcoming webinar page:

1) Copy template from a past webinar (in website/webinars/past/)
2) In website/webinars/past folder, click Add file and select Create new file.
3) Name file used date and topic and .qmd file type (e.g., 2023-01-20-disabilities-transitioning.qmd)
4) Paste copied template
5) Edit template with webinar specific information. (Can open github in a separate tab to copy information.)
6) When/if webinar video and slides are available, add links under Recording and SLides. If not available, use "<!--" to suppress these lines of code. Can leave note: "Recording coming soon. Sign up for our [weekly newsletter](https://datascijedi.org/weekly-newsletter.html) to be notified when recording is available." 
7) Commit new file
8) IF THERE ARE NO UPCOMING WEBINARS, update website/webinars.qmd. with the follow: comment out upcoming webinars on the listing (from - id: upcoming webinars to type:default); use "<!-- ... -->" to suppress upcoming-webinars and remove these from around "New webinars are coming" message. 
9) IF THERE ARE NO UPCOMING WEBINARS, update index.qmd to display past webinars instead of upcoming. To do this, change content from webinars/past to webinars/upcoming. (Home page may look the same since this webinar will still be featured, but check that link goes to past webinar page instead of page.) 
10) Delete page from website/webinars/upcoming.

### JEDI Corner

Each month, update website with a new JEDI corner article.

1) Save photo of author or article image to images/jedi-corner  
2) In jedi-corner.yml, copy entry from previous month. Edit article information, Committ changes.

### Accessibility Tips

Accessibility is too large a topic to be completely covered here, but below are a few tips and examples for content editors to use. In particular, try to use `alt`, `aria-label`, or similar tags appropriately when adding images or links to the website. 

#### Example 1

When inserting an image with HTML, the `alt` tag can help convey the image's contents to screen reader users. 

`<img src="images/jedi-logo-wide.png" alt="Logo of the Justice, Equity, Diversity, and Inclusion Outreach Group">`

#### Example 2

When inserting images with Quarto markdown syntax, the `fig-alt` attribute can be used for adding alt text. 

`![](images/jedi-at-jsm/schedule-no0069Or1614Sessions.png){fig-alt="A schedule graphic depicting..."}`

This also applies if your image is wrapped further in a markdown hyperlink. 

`[![](images/jedi-at-jsm/schedule-no0069Or1614Sessions.png){fig-alt="A schedule graphic depicting..."}](images/jedi-at-jsm/schedule-no0069Or1614Sessions.png)`

#### Example 3

An `aria-label` can help make a link's purpose clearer to screen reader users. 

`<a class="nav-link" aria-label="Edit this Page on GitHub" href="https://github.com/datascijedi">Edit on GitHub</a>;`

#### Additional Resources

Here are a few resources you can use to learn more about accessibility:

- [Berkeley Web Accessibility Tips](https://webaccess.berkeley.edu/resources/tips/web-accessibility)
- [Firefox - Accessibliity Inspector](https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/)
- [Axe Dev Tools](https://www.deque.com/axe/devtools/)
- [Thorough Reference on Accessibility](https://www.section508.gov/content/guide-accessible-web-design-development/)

## Development Setup

Unless making edits right on the GitHub website serves your needs, [Quarto](https://quarto.org/) is the main dependency required for making updates to the website. Below we provide steps to get started in various development environments, some of which will take care of the Quarto setup for you.

Matching the Quarto version in your development environment to production is important to be able to match the production website behavior (unless of course you are working on changing the version), so please try to get as close as possible. Once set up, you can check the Quarto version in your development environment by running `quarto -V` in a terminal. 

### Codespaces

Codespaces is a browser-based IDE that currently provides 60 hours of usage free per month with their default two core setup.

1) [Navigate to the repository](https://github.com/datascijedi/website) on GitHub.
2) Click the Code button, and create or open a Codespace from there. 
3) If needed, open up the integrated terminal, then run `quarto preview` to start up the Quarto dev server.
4) At this point, you should be presented with a button to open up a development version of the website in your browser, which should reflect any changes you make. 

For more on Codespaces, check out:
https://docs.github.com/en/codespaces/getting-started/quickstart

### Local Development

1) Find the current Quarto version being used in the [deploy script](https://github.com/datascijedi/website/blob/main/netlify_deploy.sh), where it will be in the variable `QUARTO_TARBALL_URL`.
2) Download the correct version for your platform from [Quarto's releases](https://github.com/quarto-dev/quarto-cli/releases) and install.
3) Clone this repository (or fork and clone, e.g. if you don't currently have direct access).
4) From the root of the repository, run `quarto preview` in your terminal and a local version of this website should be available in your browser. The default port is currently 4200.

### Project IDX

Project IDX is a browser-based IDE which is currently in beta and available to use for free. 

1) Go to https://idx.dev/. Click on "Get Started" in the top right, creating an account as necessary. If you are already a Google/Gmail user and currently logged in, the default behavior might be to sign you in with the same account.
2) Click on "Import a repo" on the right hand side, enter in the GitHub repository URL (https://github.com/datascijedi/website), and then click the "Import" button which should open up the IDE.
3) Open up the integrated terminal _(Horizontal Striped Menu -> View -> Terminal)_ and run `quarto preview` to start up the Quarto dev server.
4) Click on the "Project IDX" button on the left side of the window (the bottom button, it looks like an arrow facing right), expand "BACKEND PORTS" at the bottom of the opened side panel, and click the button to open the preview URL which should reflect any changes you make.

For more about Project IDX, check out: https://developers.google.com/idx/guides

### Quarto Upgrade and Deployment

The website is deployed with Netlify via [netlify_deploy.sh](https://github.com/datascijedi/website/blob/main/netlify_deploy.sh) and [netlify.toml](https://github.com/datascijedi/website/blob/main/netlify.toml). 

Below is a checklist for upgrading Quarto to a new version:

1. Find the link for your desired Quarto version at https://github.com/quarto-dev/quarto-cli/releases. The file should end with `linux-amd64.tar.gz`.
2. Update `QUARTO_TARBALL_URL` in `netlify_deploy.sh` in the repository root with the above mentioned link. This is what will be used in the production deployment.
3. For Codespaces: Update the Quarto version specified in the `.devcontainer/devcontainer.json` file.
4. For Project IDX: If you can find the right version by searching for "quarto" at https://search.nixos.org/packages, then update `.idx/dev.nix` in the repository root with the correct channel version (e.g. `channel = 24.05`), which will be in the top left of the NixOS website. If you can't find the correct Quarto version, try clicking "unstable" on the NixOS website, and search for quarto again. If you find a better fit (e.g. the right version, or a newer version than what was being used), then replace the channel version with "unsable" (e.g. `channel = unstable`).

If you get stuck on the above (which could happen, for instance, if the process evolves abruptly), feel free to reach out to one of the current or past contributors for help!

## JEDI Membership

Consider becoming a member of the JEDI Outreach Group to stay in the loop, make suggestions, and plenty more:

https://datascijedi.org/get-involved.html

As a member, you can also join one of our committees to help out with various volunteer-driven activities:

https://datascijedi.org/activities.html
