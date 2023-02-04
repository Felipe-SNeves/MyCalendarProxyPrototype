const express = require ('express');
const app = express ();
const bodyParser = require ('body-parser');
const { google } = require ('googleapis');

const CREDENTIALS = JSON.parse (process.env.CREDENTIALS);
const calendarID = process.env.CALENDAR_ID;
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar ({ version: "v3" });

const auth = new google.auth.JWT (
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

let getEvents = async () => {
    try {
        let response = await calendar.events.list ({
            auth: auth,
            calendarId: calendarID
        });
        return response['data']['items'];
    } catch (error) {
        console.error ("Error on get events: ", error);
        return false;
    }
}

app.use (bodyParser.json ());

app.use ((req, res, next) => {
    res.setHeader ("Access-Control-Allow-Origin", "*");
    res.setHeader ("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader ("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader ("Content-Type", 'application/json');
    next ();
});

app.get ('/getCalendar', (req, res, next) => {
	console.log ("Received request!");
    getEvents ().then ((events) => {
        res.status (200).json ({
            response: events
        });
    });
});

module.exports = app;
