const express = require('express');
const router = express.Router();
const socketio = require('socket.io');
const http = require('http');
const { displayChatRoom } = require('./users.js');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(router);

router.use(
  express.urlencoded({
    extended: true
  })
)

router.use(express.json())


router.get('/', (req,res) => {
    res.send('server is running');
});

router.get('/thread/:room', (req,res) => {
    try{
        console.log("GET: params: ", req.params);
        let room = req.params.room.trim().toLowerCase();
        let result = displayChatRoom(room);
        if (!result) {
            console.log('status: 404 Not Found', { msg: 'Room not found.'})
            return res.status(404).json({ msg: 'Room not found.' })
          }
        res.json(result);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//TODO: FIGURE OUT HOW TO MAKE A CONNECTION
router.post('/thread/:room/:username', async (req, res) => {
    console.log("POST: params: ", req.params);
    console.log("POST: body: ", req.body);
    const { room, name } = req.params;
});

module.exports = router;