![Build and Deploy](https://github.com/iankhor/zombies/workflows/Build%20and%20Deploy/badge.svg?branch=master)
![Coverage](https://codecov.io/github/iankhor/zombies/branch/master/graph/badge.svg)
![Status](https://img.shields.io/uptimerobot/ratio/7/m785278502-d1f412201073f43b744bbe39)

# ;TLDR

An app to simulate a zombie apocalypse

Deployed app is at [https://al-zombie.herokuapp.com/](https://al-zombie.herokuapp.com/)

---

Animated demo below

TBA

<!-- ![](/docs/demo.gif) -->docs

## Instructions

To run on a your local machine

Prerequisites: [yarn](https://github.com/yarnpkg/yarn)

1. Clone this repo
2. run `yarn install`
3. run `yarn start`
4. On a browser, go to `localhost:8080`

To run test

1. run `yarn test:dev`

## Design Notes

- A bottom up design approach was used to create this app (ie: the building blocks/functions in the `lib` folder were written first) with a mixed use of TDD and BDD.
- With these building blocks in place, a user form was create using `React` to gather user input based on the requirements
- A web broswer was used as the user input component via a form to reduce user input errors in order to demonstrate the purpose of this app.
- Very simplistic form validation was used.
- With test/specs in place, a refactoring exercise was taken to make the code more explicit for future consumption.
- Simple CSS was applied.
- An app was deployed to heroku to demonstrate the code challenge as well.
