#!/usr/bin/env node

const WebSocket = require('ws');
const express = require('express');
const fs = require('fs');
const url = require('url');
const os = require('os');
const args = require('args');

args.option('port', 'Debugger port', 8788)
    .option('socketPort', 'Socket port', 8787);

const params = args.parse(process.argv);

const socketPort = params['socketPort'] || 8787;
const debuggerPort = params['port'] || 8788;

const app = express();
const wss = new WebSocket.Server({port: socketPort});
let browser;

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/debugger', function (req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        if (err) {
            res.status(500);
            return res.send('Fail');
        }
        text = text.replace('{{port}}', socketPort);
        return res.send(text);
    });
});

wss.on('connection', (ws, req) => {

    const params = url.parse(req.url, true);
    const client = params.query.client;

    if (client === 'browser') {
        browser = ws;
    }

    ws.on('message', message => {
        if (client === 'app' && browser) {
            try {
                browser.send(message);
            } catch (e) {
                console.log(e);
            }
        }
    });
});

const ifaces = os.networkInterfaces();
const addresses = [];

Object.keys(ifaces).forEach(function (ifname) {
    let alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
        }
        if (alias < 1) {
            addresses.push(iface.address + ':' + socketPort);
        }
        ++alias;
    });
});

console.log('Socket urls:', addresses.join(', '));

app.listen(debuggerPort, function () {
    console.log('Debugger started:', 'http://localhost:' + debuggerPort + '/debugger');
});
