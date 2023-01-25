# BienVenue - An App for Gigging Musicians

BienVenue is an app that aims to solve a common problem that touring and gigging musicians have when booking their own shows: finding the best venues to perform at and accurate contact information for bookers at these venues. The app will build a database of music venues across the world, which users can constantly refer to when in search of reputable venues. BienVenue is meant to be a central hub for DIY musicians booking their own gigs.

## Technologies Used

Javascript, Express, Mongodb, Mongoose, Cors, Passport, Passport_JWT, Jsonwebtoken, and Bycrypt

## ERD

![Entity Relationship Diagram](./images/BienVenue%20ERD.jpg)

## Routes Table

|  NAME  |    PATH      | HTTP VERB |         PURPOSE           |
| ------ | ------------ | --------- | ------------------------  |
| Index  |   /venues    |    GET    |    Shows all venues       |
| Show   |  /venues/:id |    GET    |  Shows newly added venues |
| Create |  /venues     |    POST   |  Creates a new venue      |
| Delete |  /venues/:id |   DELETE  |    Deletes the venue      |