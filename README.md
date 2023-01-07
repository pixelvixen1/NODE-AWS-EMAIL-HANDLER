## Node.js / AWS -  Email Handler serverless application.

## About
This project includes two email micro services which work with Amazon Web Services SDK V3, that share the same data and resources yet can be deployed independently using Bitbucket pipelines. 

The Email Builder Application is used to automatically build, generate and store customized, localized (LTR/RTL), rich media email templates using the Maizzle framework, Handlebars, AWS Lambda, EFS, S3 and Cloudflare. These templates can be generated with any language and content, which can be easily set and triggered from messages sent to AWS Lambda, an API endpoint, or simply through the command line.

The Email Sender Serverless Lambda Application receives messages from AWS SQS about the user language, template style and user email data. It retrieves the generated localized template from AWS S3, and then populates it with language data stored in AWS EFS, which then injects and sends the email via AWS SES SMTP.

Unit and integration tests (Jest and Cypress) are included.

Continuous delivery pipeline for Bitbucket, which runs and processes all of the linting, tests and builds before zipping up and deploying Artifacts to AWS S3 and Bitbucket.

Please note this project has been published for purely code example basis.
You will need an AWS account to set up and integrate all the services to test the full application. 

## Email Builder - standalone node version example
I have included a Node local server version for the Email Builder application which will run, build and store the email templates generated locally. 

To Run the node example :

Download the files and CD into the email_builder folder.

Run ‘npm install’ on the command line to install all dependencies for this app.

Run ‘npm run app’ - this will start a local server on port 4000.

Navigate in your browser to http://localhost:4000/.

Use Postman or any service to POST data to the endpoint http://localhost:4000/aws/build-email with the following data structure:

{ 
  "templateId": "reset-password",
   "data": {
     "name" : "Sam Jones", 
     "email" : "sam@gmail.com" 
    },
   "language": "en-GB"
}

Use links on the page to preview the generated email templates which have been saved locally in the dist folder.



