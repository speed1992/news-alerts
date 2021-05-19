# News Alerts

## Installation

```bash
npm install
```
## To start the app 

#### Production mode

```
npm start
```

##### Note: Always run this app in dev mode. Production Github API takes only a restricted number of hits from one IP address. Running too many times in prod mode will exhaust the number of hits and the app will stop working.
#### Development mode

```
npm run dev
```

## Complete Setup

#### Change 

1) config/credentials.js.example to config/credentials.js



* Add sender's credentials
```javascript 
username: "yourEmailAddress@gmail.com"
```
* Password must be escaped. Use this tool to escape your password [Escape Tool](https://www.freeformatter.com/javascript-escape.html)
Password must be served through the environment variable GMAIL_PASSWORD

##### package.json
```javascript 
    "dev": "cross-env NODE_ENV=development GMAIL_PASSWORD=yourPassword node server.js"
```
* Slack API Token must be served through the environment variable SLACK_API_TOKEN

##### package.json
```javascript 
    "start": "cross-env NODE_ENV=development GMAIL_PASSWORD=yourPassword SLACK_API_TOKEN=xxxxxxxSlackAPITokenxxxxxx node server.js",
```




* Add emails to recipients
```javascript 
 recipients: [
    "yourEmailAddress@gmail.com",
    "anotherEmailAddress@gmail.com"
  ],
  errorRecipients: ["youremailaddress@gmail.com", "anotherEmailAddress@gmail.com"]
```

2) config/config.js



##### For dev mode

* Supply new demo API URL, create a demo API, for example, using jsonblob.com 
* copy API data from prod URL

```javascript
https://api.github.com/repos/facebook/create-react-app/releases/latest
```

##### Change dev url in config/config.js
```javascript
dev_URL: "https://jsonblob.com/api/f13430d8-d313-11ea-bb09-433dc46d1195"
```
## Debug

Error logs are made at 

```
/quick-start-combined.log
```


## Further references

* Never commit crendtials.js, use the below method to configure git to always ignore credentials.js

```
https://stackoverflow.com/questions/1753070/how-do-i-configure-git-to-ignore-some-files-locally
```

## Deploy permanently on the local machine

#### Install production process manager PM2

```bash
npm install pm2 -g
```

For windows, make a script

```startNewsTool.bat```


```
pushd "E:\nodejsCrud"
pm2 start server.js --name news-tool --time --log "E:\nodejsCrud\logs.txt"
exit
```

* change the cd address in the below command to the local location of the project

* change the log address to an empty server Log text file


For macOS / Ubuntu, make a script

```startNewsTool.sh```

```
pm2 start /home/paras/Desktop/news-alerts/server.js --name news-tool --time --log "/home/paras/pm2-logs/logs.txt"
```

#### Add this script to the startup of windows / macOS / Ubuntu

## Start Monitoring
To monitor the status of the service deployed, open PM2 Dashboard

```bash
pm2 monit
```
#### For more PM2 commands 

* [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

