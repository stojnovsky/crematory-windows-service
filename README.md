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



### Variant 1
```bash
node app.js
```

### Variant 2   -   start as a process
```bash
node ./bin/servie
```
