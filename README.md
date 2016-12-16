# crematory-windows-service



### install node modules
```bash
npm install
```


### Configuration - in packet.json
```json
{
  "crematory_service": {
      "target": "crematory_test",
      "port": 33333,
      "host": "127.0.0.1"
  }
}
```
crematory_service.target is a sub-path in os.home_folder() 
if missing will be automaticaly created by service



### Variant 1
```bash
node app.js
```

### Variant 2   -   start as a process
```bash
node ./bin/servie
```

### Open in browser
http://127.0.0.1:33333
