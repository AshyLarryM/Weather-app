<img width="1439" alt="Screenshot 2023-08-27 at 9 23 26 PM" src="https://github.com/AshyLarryM/Weather-app/assets/89487278/b231d184-71c5-4d5e-bce7-32aa58a62048">

# Weather Application

A Weather Application that uses searchable location, or current location weather updates.  The goal of the application was to use AWS Lambda functions in order to call the OpenWeather API for real-time updates in a secure manner.
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)

## Introduction
This application served as a way to utilize the security of calling an API using a Lambda Function.  In order to do this correctly I had to create an AWS API Gateway to GET weather updates based on a user's current location or searched City/State.  The API Gateway runs the Lambda code that fetches the weather data and then sends the response back through the API to the client (front-end)

## Technologies
- AWS API Gateway
- AWS Lambda
- React
- Tailwind CSS
