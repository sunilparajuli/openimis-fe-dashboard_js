# openIMIS Frontend Dashboard Module

This repository holds the files of the openIMIS Frontend Dashboard module.  
It is designed to be deployed as a module of [openimis-fe_js](https://github.com/openimis/openimis-fe_js).

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Contribution Points

- `core.Router`: Registers the dashboard route (`/dashboard/analytics`) in the openIMIS client-side router.
- `refs`: Exposes the dashboard as a reusable component reference (`dashboard.Analytics`).
- `reducers`: Registers the dashboard reducer under the `dashboard` key.
- `translations`: Provides English translations (`en.json`).

## Usage

If you want to show the dashboard inside the **Home** module (or any other module), you can use the published component reference:

```jsx
<PublishedComponent pubRef="dashboard.Analytics" />


![Dashboard Preview]

<img width="1637" height="849" alt="image" src="https://github.com/user-attachments/assets/300ba563-6f5a-4b33-b899-b663c842878f" />


