const APP_ID = 'e5d4f10b172c4d6983ff3ed563b55378'
const  CHANNEL = 'main'
const  TOKEN = '007eJxTYJDw45D37VUunbfesiQ85Ylqc6Lwr6h3x9/v2mux6aa02mcFhlTTFJM0Q4MkQ3OjZJMUM0sL47Q049QUUzPjJFNTY3OLWQmz0xoCGRl28wqzMjJAIIjPwpCbmJnHwAAA7aoeJQ=='
let UID;

console.log('Stream.js connected')

const client = AgoraRTC.createClient({mode: 'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
    let player = `<div class="video-container" id="user-container-1">
                    <div class="username-wrapper"><span class="user-name">My Name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`
}