# News Alerts




## Installation

```bash
npm install
npm start
```

## Usage

Change 

1) config/credentials.js 

* Add sender's credentials
```javascript 
username: "yourEmailAddress@gmail.com",
escapedPassword: "your password"
```

* Add emails to recipients
```javascript 
 recipients: [
    "yourEmailAddress@gmail.com",
    "anotherEmailAddress@gmail.com"
  ],
  errorRecipients: ["youremailaddress@gmail.com"]
```

2) config/config.js

for prod mode

```javascript
appMode: "production"
```



for dev mode

```javascript
appMode: "dev"
```
* Supply new demo API URL, create a demo API, for example, using jsonblob.com 
* copy API data from prod URL

```javascript
https://api.github.com/repos/facebook/create-react-app/releases/latest
```

Change dev url in config/config.js
```javascript
dev_URL: "https://jsonblob.com/api/f13430d8-d313-11ea-bb09-433dc46d1195"
```

## Further references

* Never commit crendtials.js, use the below method to configure git to always ignore credentials.js

```
https://stackoverflow.com/questions/1753070/how-do-i-configure-git-to-ignore-some-files-locally
```
