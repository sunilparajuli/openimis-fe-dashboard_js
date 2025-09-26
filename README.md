# openIMIS Frontend Home reference module

This repository holds the files of the openIMIS Frontend Home reference module.
It is dedicated to be deployed as a module of [openimis-fe_js](https://github.com/openimis/openimis-fe_js).

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/openimis/openimis-fe-home_js.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/openimis/openimis-fe-home_js/alerts/)

## Other Contributions

- `core.Router`: registering the `home` route in openIMIS client-side router.

## Available Contribution Points

- `home.HomePage.Container`: Use to override the container of the homepage completely (default: display `home.HomePage.Blocks`)
- `home.HomePage.Blocks`: Blocks displayed on the homepage. The current `user` is passed to each contribution. An example of block can be found on the [Claim management module](https://github.com/openimis/openimis-fe-claim_js)

## Configurations Options

- `HomePageContainer.showHomeMessage`: a boolean configuration flag that determines whether or not a special message will be displayed on the home page. If set to true, the application will fetch and display HTML content based on the URL specified in **HomePageContainer.homeMessageURL**. By default, this is set to false. It means that no additional message will be displayed on the home page.
- `HomePageContainer.homeMessageURL`: a string configuration that specifies the URL from which to fetch the HTML payload for display on the home page. By default, this is set to an empty string (""), meaning no URL is specified. This URL is used only when **HomePageContainer.showHomeMessage** is set to true.
- `HomePageContainer.showHealthFacilityMessage`: boolean to show HF status information. It shows days to the end of the contract of a HF assigned to a current user. Default false.
