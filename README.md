# fbiReport

1. To install all dependencies:
```
npm install
```

2. To start the server:
```
npm start
```
In config.json you can edit the port on which the server is running and the paths to the data files.

Post route `/report` is used for adding reports.
Post body:
```
{
"name":  "name related to the case",
"phone":  "phone number on which they can be contacted",
"text":  "Additional text"
}
```