# Contributing

We welcome and value contributions from everyone. Contributions can include adding website content, making or suggesting a fix, or developing new website features. Hope to see you around! 

## Table of Contents

- [Workflow](#workflow)
- [Content](#content)
  - [Adding Links](#adding-links)
  - [Updating Resources](#updating-resources)
  - [Updating Webinars](#updating-webinars)
  - [JEDI Corner](#jedi-corner)
- [Development](#development)
  - [Setup](#setup)
  - [Deployment](#deployment)
- [JEDI Membership](#jedi-membership)

## Workflow

To contribute code or content, just submit a pull request against the `main` branch! If you are embarking on a larger effort or just want to let us know of an issue, consider creating a GiHub issue as well. 

If you're using R Studio or prefer a non-technical approach, check out [this recording](https://drive.google.com/file/d/1tYgy2J9Yne-YX4c1JdHnQLGTgK3G2wAc/view?usp=sharing) from a Communications Committee meeting that demostrates two approaches to starting a pull request and requesting a merge. 

## Content

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

## Development

### Setup

For website code contributions, you'll probably want to get a local development setup going. We use [Quarto](https://quarto.org/) for website development which can be run from the command line, R, or Python. 

Below are steps to get set up when using Quarto via the command line. 

1) Check which version of Quarto we are currently using. Look for this in the [deploy script](https://github.com/datascijedi/website/blob/main/netlify_deploy.sh), where it will be in the variable `QUARTO_TARBALL_URL`.
2) Download the correct version from [Quarto's releases](https://github.com/quarto-dev/quarto-cli/releases) and install.
3) Fork and/or clone this repository. 
4) From the root of the repository, run `quarto preview` and a local version of this website should open up in your browser.

### Deployment

The website is deployed with Netlify via [netlify_deploy.sh](https://github.com/datascijedi/website/blob/main/netlify_deploy.sh) and [netlify.toml](https://github.com/datascijedi/website/blob/main/netlify.toml). 

To update the Quarto version used for Netlify production deployments and deploy previews, [find the link](https://github.com/quarto-dev/quarto-cli/releases) to the tarball (it should with "linux-amd64.tar.gz") and update `QUARTO_TARBALL_URL` in [netlify_deploy.sh](https://github.com/datascijedi/website/blob/main/netlify_deploy.sh) with this link.

## JEDI Membership

Consider becoming a member of the JEDI Outreach Group to stay in the loop, make suggestions, and plenty more:

https://datascijedi.org/get-involved.html

As a member, you can also get involved with one of our committees to help out with various volunteer-driven activities:

https://datascijedi.org/activities.html
