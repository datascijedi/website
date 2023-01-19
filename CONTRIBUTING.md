# Contributing

We welcome and value contributions from everyone. 

## Contribution Types

Below are some ways in which you can help. 

- Code contributions (typo fixes, website enhancements, improving documentation, etc.)
- Design contributions (e.g. graphic design for the website and/or social media)
- Cloud/Infrastructure Sponsorship - Having cloud/infrastructure resources would help lower the barrier for us to add more functionality to our website. If you are interested in supporting the JEDI Outreach Group by providing such resources, please contact us at admin@datascijedi.org. 
- Website expertise - If you're knowledgable about website development (e.g. creating the backend for a website application), we would be interested in hearing your ideas (whether you can provide development time or not). Please get in touch at admin@datascijedi.org. 
- Any other ideas? Feel free to open a Github issue to suggest and discuss ideas, or get in touch with us at admin@datascijedi.org. 

## Workflow for Code Contributions

For code contributions, please submit a PR using the following steps:

1) Fork the [datascijedi/website](https://github.com/datascijedi/website) repository. 
2) Create a branch using a descriptive name (e.g. `my-awesome-feature`) and make your additions there. 
3) Create a pull request from `my-awesome-branch` in your forked repository to the `main` branch of the [datascijedi/website](https://github.com/datascijedi/website) repository. 

## Local Dev Setup

We use the Quarto framework for website development. Below are some steps to get up and running:

1) Download and install Quarto from [https://quarto.org/docs/get-started/](https://quarto.org/docs/get-started/). 
2) Fork and clone this repository. 
3) Navigate to the root of the cloned repository and run `quarto preview`. This should open up a local version of this website in your browser. 

There are various ways to develop using Quarto, so feel free to check out the official [Quarto docs](https://quarto.org/docs/get-started/hello/) for more information. 

## Updating Webinars

### Upcoming webinars

For adding information on upcoming webinars, use the following stpes:

1) Add webinar image or flyer to website/webinars/images. Note, pdf flyers are not ideal; they don't display well. png or jpg are preferred.
2) Copy content of dummy-webinar.qmd from website/webinars
3) Create new .qmd file in website/webinars/upcoming, paste dummy-webinar content, and edit all available fields.
4) If necessary, update website/webinars.qmd to replace "Coming soon" message, display upcoming webinars. Use <!-- at the start of Coming soon message and --> at end to supress. Remove #s on listing content to show upcoming webinars (lines 4-8). (Ensure proper spacing, look at past webinars list for example.) Remove <!-- and --> around :::{#upcoming webinars} ::: 
5) If necessary, updated index.qmd to display upcoming webinars instead of past webinars. To do this, change content from webinars/past to webinars/upcoming
 
## Adding links
When inserting links, use clear label describing the purpose of the link. This makes the website more accessible for viewers using screen readers (among other accecsibility benefits). [Read more about Accesible Rich Interner Applications at this link.](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8#:~:text=The%20aria%2Dlabel%20attribute%20provides,used%20instead%20of%20aria%2Dlabel%20)
