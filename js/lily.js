//function createSplatter(x, y, rainContainer) {
//    for (let i = 0; i < 3 + Math.random() * 3; i++) { // 3 to 6 droplets
//        const splatter = document.createElement('div');
//        splatter.classList.add('splatter');
//        
//        // Randomize position within a small radius
//        const offsetX = (Math.random() - 0.5) * 10; // Spread within 10px
//        const offsetY = (Math.random() - 0.5) * 5;
//
//        splatter.style.left = `${x + offsetX}px`;
//        splatter.style.bottom = `${y + offsetY}px`;
//
//        rainContainer.appendChild(splatter);
//
//        // Remove splatter after animation
//        setTimeout(() => {
//            splatter.remove();
//        }, 400);
//    }
//}
//
//function createRainDrop(rainContainer) {
//    const rainDrop = document.createElement('div');
//    rainDrop.classList.add('rain-drop');
//
//    const leftPos = Math.random() * window.innerWidth;
//    rainDrop.style.left = `${leftPos}px`;
//
//    const fallDuration = 0.5 + Math.random() * 0.5;
//    rainDrop.style.animationDuration = `${fallDuration}s`;
//
//    rainDrop.style.opacity = Math.random();
//
//    rainContainer.appendChild(rainDrop);
//
//    setTimeout(() => {
//        createSplatter(leftPos, 162, rainContainer);
//        rainDrop.remove();
//    }, fallDuration * 1000);
//}
//
//function createRain() {
//    const rainContainer = document.querySelector('body');
//    setInterval(createRainDrop, 20, rainContainer);
//}
//
const video = document.querySelector('video');
const animationRunTime = 2500;
//const startTime = 0.5;
//const endTime = 0.9;
//
//// function to loop segment
//function loopSegment() {
//    if(video.currentTime >= endTime) {
//	    video.currentTime = startTime;
//	    video.play();
//    }
//}

// function to start video
function startVideo() {
    // remove the loop event listener
    //video.removeEventListener('timeupdate', loopSegment);

    video.playbackRate = 1.6
    video.play();
}

// function to start post authentication animation
function startAnimation(usertext, passtext) {
    // hide the input elements
    usertext.style.display = 'None';
    passtext.style.display = 'None';

    // hide the titles
    const hdr1 = document.querySelector('h1');
    const hdr2 = document.querySelector('h2');
    hdr1.style.display = 'None';
    hdr2.style.display = 'None';

    // hide the buttons
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {btn.style.display = 'None'});

    // start the video 
    startVideo();
}

// function to wait for n ms
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// function to sumbit username and password and authenticate
async function authenticate(username, password) {
    // check username and password with lightdm
    lightdm.authenticate(username);
    await wait(100);
    lightdm.respond(password);

    // wait and then return authentication value
    await wait(100);
    return lightdm.is_authenticated;
}

// function to add event listener to power buttons
function powerbuttonHandling() {
    // get the power buttons
    const shutdown = document.getElementById('shutdown-btn');
    const restart = document.getElementById('restart-btn');

    shutdown.addEventListener('click', () => {
        lightdm.shutdown();
    });
    
    restart.addEventListener('click', () => {
        lightdm.restart();
    })
}

// function to init greeter
async function initListener() {
    // get username, password and button element
    const usertext = document.getElementById('username');
    const passtext = document.getElementById('password');
    const btn = document.getElementById('login-button');

    // loop the first second of the video
    //video.addEventListener('timeupdate', loopSegment);

    // event listener to get login when button is clicked
    btn.addEventListener('click', async () => {
        const authenticated = await authenticate(usertext.value.trim(), passtext.value.trim());
         // if password is correct, start video and start session
        if(authenticated) {
            startAnimation(usertext, passtext);
            await wait(animationRunTime);
            lightdm.start_session(lightdm.sessions[0].key);
        } else {
            // if password is incorrect, turn the password box red
            passtext.style.border = "2px red";
            passtext.style.borderStyle = "solid";
        }
    });

    // event listener to login when enter button is pressed
    passtext.addEventListener('keyup', async (event) => {
        if(event.key === "Enter") {
            const authenticated = await authenticate(usertext.value.trim(), passtext.value.trim());
            // if password is correct, zoom in on image and start session
            if(authenticated) {
                startAnimation(usertext, passtext);
                await wait(animationRunTime);
                lightdm.start_session("xinitrc");
            } else {
                // if password is incorrect, turn the password box red
                passtext.style.border = "2px red";
                passtext.style.borderStyle = "solid";
            }
        }
    });

    // add rain
    //createRain();

    // add power button handling
    powerbuttonHandling();
}

/* Driver Code */
initListener();
