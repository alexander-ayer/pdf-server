# Capstone Project Documentation Portal

## Description

This project is a secure pdf server that allows users to view and download key documents from team Black's 2025 computer science Capstone project. This portal was created to keep documents organized and available to the developement team and their client. This site works using a custom made routing module that navigates the site directory. All documents are stored as metadata in a single JSON file and delivered securely using custom validation components.

## Table of Contents

*   [Installation](#installation)
*   [Usage](#usage)
*   [Features](#features)
*   [Links](#links)

## Installation

*   navigate to the directory you wsh to store the code
*   clone this repository using the command:
        git clone <repository url>
*   navigate to the pdf-server directory 
        cd pdf-server
*   Install dependencies
        npm install: 
* Thats it. Should be good to go!

## Usage

To use this program, navigate to the root directory (pdf-server) and run the command:
                npm start
Once the server has started, navigate to:
                https://alexayer.site

## Features

-  Homepage featureing basic information about software developement
-   A documents page that lets you view/download each document available on the server
- Secure PDF delivery using Express sendFile() with path validation
- JSON - based metadata storage for documents, titles, and descriptions
   - Stored in single 'pdfs.json' file
   - Structure:
      - 'filename' - name of pdf file
      - 'title' - human-readable document title
      - 'description' - brief sumary of document
- Modular architecture seperating routing, validation, discovery, and metadata concerns.
- Reverse proxy deployment using Nginx
- HTTPS encryption

## Links

*   **Project URL:** [https://alexayer.site](https://alexayer.site.com)
*   **Repository URL:** [https://github.com/alexander-ayer/pdf-server](https://github.com/alexander-ayer/pdf-server)
*   **Contact:** [alexander.ayer@maine.edu](mailto:alexander.yer@maine.edu)



