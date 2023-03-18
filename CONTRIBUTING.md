# Contributing

We welcome and value contributions from everyone. Contributions can include adding website content, making or suggesting a fix, or developing new website features. Hope to see you around! 

## Table of Contents

- [Workflow for Contributions](#workflow-for-contributions)
- [Developer Setup](#developer-setup)
- [Content Contributions](#content-contributions)
  - [Adding Links](#adding-links)
  - [Updating Resources](#updating-resources)
  - [Updating Webinars](#updating-webinars)
  - [JEDI Corner](#jedi-corner)
- [General JEDI Membership](#general-jedi-membership)

## Workflow for Contributions

To contribute code or content, just submit a pull request against the `main` branch! If you are embarking on a larger effort or just want to let us know of an issue, consider creating a GiHub issue as well. 

For non-technical and R-based GitHub work flows, check out [this recording](https://drive.google.com/file/d/1tYgy2J9Yne-YX4c1JdHnQLGTgK3G2wAc/view?usp=sharing) from a Communications Committee meeting that demostrates two approaches to starting a pull request and requesting a merge. 

### Deploy Previews

One of the benefits of being a member of the GitHub JEDI organization is that you can take advantage of deploy previews: when you submit a pull request against the main branch, a website build will be triggered and a URL for the new website version will be created automatically. If you're an external collaborator interested in larger or longer term contributions, we can look into adding you as a team member as well to take advantage of this collaboration feature. 

## Developer Setup

For website code contributions, you'll probably want to get a local development setup going. 

We use the Quarto framework for website development. There are many ways to develop using Quarto (e.g. one can use R, Python, or a CLI). Check out the official [Quarto docs](https://quarto.org/docs/get-started/hello/) for more info. 

Here is one path to start developing:

1) Download and install Quarto from [https://quarto.org/docs/get-started/](https://quarto.org/docs/get-started/). 
2) Fork and/or clone this repository. 
3) Navigate to the root of the cloned repository and run `quarto preview`. This should open up a local version of this website in your browser. 

## Content Contributions

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
 6) When/if webinar video and slides are available, add links under Recording and SLides. If not available, use "<!--" to suppress these lines of code. Can leave note: "Recording coming soon. Sign up for our [weekly newsletter](weekly-newsletter.qmd) to be notified when recording is available." 
 7) Commit new file
 8) IF THERE ARE NO UPCOMING WEBINARS, update website/webinars.qmd. with the follow: comment out upcoming webinars on the listing (from - id: upcoming webinars to type:default); use "<!-- ... -->" to suppress upcoming-webinars and remove these from around "New webinars are coming" message. 
 9) IF THERE ARE NO UPCOMING WEBINARS, update index.qmd to display past webinars instead of upcoming. To do this, change content from webinars/past to webinars/upcoming. (Home page may look the same since this webinar will still be featured, but check that link goes to past webinar page instead of page.) 
 10) Delete page from website/webinars/upcoming.

### JEDI Corner

Each month, update website with a new JEDI corner article.

1) Save photo of author or article image to images/jedi-corner  
2) In jedi-corner.yml, copy entry from previous month. Edit article information, Committ changes.

## General JEDI Membership

Consider becoming a general member of the JEDI Outreach Group member to stay in the loop, make suggestions, and plenty more:

https://datascijedi.netlify.app/get-involved.html

If you're reading this and want to help out, but are still not sure how, consider joining one of our committees. The committees conduct various volunteer-driven activities that keep this group going, which are detailed here:

https://datascijedi.netlify.app/activities.html
