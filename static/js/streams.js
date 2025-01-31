const APP_ID = 'e5d4f10b172c4d6983ff3ed563b55378'
const  CHANNEL = 'main'
const  TOKEN = '007eJxTYNjzP/mcTOqH56q557s0j7H0556apnCmXuT1plcNWz9/uZ6rwJBqmmKSZmiQZGhulGySYmZpYZyWZpyaYmpmnGRqamxukTp7dlpDICPDxkuWjIwMEAjiszDkJmbmMTAAAFQdItI='
let UID;

console.log('Stream.js connected')

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)

    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
    let player = `<div  class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My Name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    // SweetAlert notification
    Swal.fire({
        title: 'User Joined',
        text: `User ${user.uid} has joined the room`,
        icon: 'success',
        confirmButtonText: 'OK'
    });

    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)

        if(player != null){
            player.remove()
        }
        player = `<div  class="video-container" id="user-container-${user.uid}">
                    <div class="username-wrapper"><span class="user-name">My Name</span></div>
                    <div class="video-player" id="user-${user.uid}"></div>
                </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
        user.videoTrack.play(`user-${user.uid}`)
    }
    if (mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

joinAndDisplayLocalStream()

