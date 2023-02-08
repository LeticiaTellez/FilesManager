# Files Manager

This web application allows users to upload and download files to and from the cloud. It includes the following features:
-   A user registration and login system.
-   A file upload form that allows users to select a file and enter a description.
-   A file listing page that displays the metadata of all the files uploaded by a user with the option to download the file of the user's choice.

## Technologies used
- .Net 6 | C#
- React.js 
- Azure Active Directory B2C
- Azure Blob Storage
- Azure App Service
- Azure Cosmos DB

## Steps to run API
*You must have .net 6 installed*

Clone git repository

    git clone https://github.com/LeticiaTellez/FilesManager.git
Open the solution FilesManager.sln

You have to fill the appsetting´s values, this values are not included in the repo for security. If you need this data please send me an email to letytellez06@gmail.com

Finally, run the API in visual studio.

## Steps to run React App
*You must have node 16.16.0 installed (with npm)*

Open the console and navigate to 

    cd FilesManager\filesmanager.app
Install npm packages

    npm install
You have to add the .env file to the root. This file is not included in the repo because it contains sensitive data. If you need it please send me an email.

Run the app

    npm start
## Deployed Version
**API**: https://filesmanagerappservice.azurewebsites.net
**App**: https://filesmanagerreactapp.azurewebsites.net/