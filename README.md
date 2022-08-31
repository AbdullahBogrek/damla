# Damla
<img src="damla.gif" alt="Project show-off animation" width="100%"/>

## Description 

**Damla is a Google Maps-based help application**. This project has been developed both to learn end-to-end web development processes and to contribute to the market.

## Table of Contents

* [General Information](#general-information)
* [Prerequisites](#prerequisites)
* [Technologies](#technologies)
    * [Frontend](#frontend)
    * [Backend](#backend)
    * [API](#api)
    * [Database](#database)
* [Setup](#setup)
* [Features](#features)
    * [Room for Improvement](#room-for-improvement)
    * [To Do](#to-do)
* [Acknowledgements](#acknowledgements)
    * [Project Status](#project-status)
* [Contact](#contact)
* [License](#license)

## General Information

- Nowadays, people try to communicate with people and ask for help through social media. They try to do this using social media celebrities or popular trends. While some are successful, most cannot reach enough people. However, someone try to defraud people and make money by exploiting their emotions. Considering these problems, it is aimed to develop a location-based environment with a safe, simple, and lean interface.    

- Users can create requests at any time after registration. To create a request, request information, user information, and address information must be entered. After this process is completed, the address information is converted into coordinate information with the **Geocoding API**. With this coordinate information, the request is marked on the map using the **Maps Javascript API**. This process is the same for creating opportunities.

## Prerequisites

- Have a billing account on [Google Cloud Console](https://console.cloud.google.com/getting-started?hl=tr).

- Create a project on [Google Cloud Console](https://console.cloud.google.com/getting-started?hl=tr) and add **Maps JavaScript API** and **Geocoding API**. Get the access token.

## Technologies

### Frontend
- React             - v18.1.0
- Bootstrap         - v5.1.3
- React Google Maps - v9.4.5
- Formik            - v2.29.3
- Yup               - v0.32.11
- ChartJS           - v3.8.0

### Backend
- Node JS           - v16.17.0
- Express           - v4.18.1
- Mongoose          - v5.12.3
- Redis             - v4.1.0
- Bcrypt            - v5.0.1
- Boom              - v7.3.0
- Cors              - v2.8.5
- Joi               - v17.4.0
- JSON Web Token    - v8.5.1

### API
- Maps Geocoding API
- Maps JavaScript API 

### Database
- MongoDB           - v6.0.1

## Setup

To run this project, install it locally using npm:

For Windows

```cmd
> redis-server service-start
```

``` cmd
> cd .\client 
> npm install
> npm start
```

``` cmd
> cd .\server
> npm install
> npm run dev
```

## Features

- You can save and manage your profile.
- You can review the benefits and opportunities on the map and contact them.
- You can create a help request or a help opportunity.
- By making an address query, you can see the help requests and help opportunities in that region.
- You can star the requests or opportunities so that you can follow them.
 
### Room for Improvement

- Improvement to UI
- Improvement to profile management
- Improvement to data security
- Improvement to help requests or opportunities page.

### To do:

- Feature to custom map style 
- Feature to filter the map (district, request, opportunities, created time, etc.)
- Feature the dark theme 
- Feature to detailed marker

## Acknowledgements

- This project has been developed as a graduation project.

- This project was based on the [backend](https://app.patika.dev/paths/nodejs-ile-backend-patikasi) and [frontend](https://app.patika.dev/paths/orta-seviye-frontend-web-development-patikasi) tutorials on [patika.dev](https://app.patika.dev/paths).

- Thanks to my friends for their help.

### Project Status

- The project is running. It has its deficiencies and needs further development. Please contact me if you have any bugs, deficiencies, or improvement ideas you see.

## Contact

Created by [@Abdullah Böğrek](https://tr.linkedin.com/in/abdullah-s-bogrek) - feel free to contact me!

Mail: asbogrek@gmail.com

## License

This project is open source and available under the [MIT](https://opensource.org/licenses/MIT).
