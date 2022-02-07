# SCB Party web application
This is a part of Join the Party Web Application SCB10X test. This web application is for joining, creating partys. 
User can :
- Login - Email and Password
- Register - Email and Password and checkbox for consent
- Party Listing - List parties/events in the system where users can join the party by clicking “Join”
- Create Party/Event - party name and # of party members

## Development and Dependency
- React
- AntD framwork
- react-router-dom v6

## Configuration
- localhost `https://localhost:3000`

## Some Detail
- Joining : The web will show all the party, and user can see and click join. But if the user have already joined, or the party is full,
  the user cannot join and the web will pop up alert message.
- Username or email : username and email is are same diffinition in this project.
- After joining, do not forget to refreash page. there are some time problem with refreach process.

## P.S.
This project use localhost both of frontend and backend, so there have a problem with Cross-Origin. ### Don't forget to disable Cross-Origin.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
