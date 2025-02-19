/**********************************************************/
/* RAIN ANIMATION CODE */

// function to create raindrop falling animation
function createRainDrop(rainContainer) {
    const rainDrop = document.createElement('div');
    rainDrop.classList.add('rain-drop');

    // randomize horizontal position
    rainDrop.style.left = `${Math.random() * 100}vw`;
    // Randomize fall speed (0.5s to 1s)
    rainDrop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;

    // Randomize opacity for variation
    rainDrop.style.opacity = Math.random();

    // Add the raindrop to the container
    rainContainer.appendChild(rainDrop);

    // Remove the raindrop after it falls to free up memory
    setTimeout(() => {
        rainDrop.remove();
    }, 2000); // Adjust timeout based on animation duration
}

// function to create rain animation
function createRain() {
    const rainContainer = document.querySelector('body');

    setInterval(createRainDrop, 20, rainContainer);
}


/**********************************************************/



// function to load ender lily theme
function loadLilyTheme() {

     // get all the elements to be modified
     const leftDiv = document.getElementById('left');
     const profileContainer = document.getElementById('profile-container');
     const rightDiv = document.getElementById('right');
     const loginButton = document.getElementById('login-button');


     // set the profile image
    const image = document.createElement('img');
    image.id = "profile-img";
    image.className = "profile";
    image.src = "../assets/ender_lilies.png";
    image.alt = "lily image";
    profileContainer.appendChild(image);    

    // set the leftDiv text
    leftDiv.children[0].innerHTML = 'Ender Lilies';
    leftDiv.children[1].innerHTML = 'Quietus of the Knights';

    // configure the button
    loginButton.innerText = 'Purify';

    // add the rain animation
    createRain();
}

// function to init greeter
async function initListener() {
    // load a random theme
    loadLilyTheme()
    
    // get username, password and button element
    const usertext = document.getElementById('username');
    const passtext = document.getElementById('password');
    const btn = document.getElementById('login-button');

    // event listener to get login when button is clicked
    btn.addEventListener('click', async () => {
        const authenticated = await authenticate(usertext.value.trim(), passtext.value.trim());
         // if password is correct, zoom in on image and start session
        if(authenticated) {
            zoomInOnImage();
            await wait(1000);
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
                zoomInOnImage();
                await wait(1000);
                lightdm.start_session(lightdm.sessions[0].key);
            } else {
                // if password is incorrect, turn the password box red
                passtext.style.border = "2px red";
                passtext.style.borderStyle = "solid";
            }
        }
    });

    // add power button handling
    powerbuttonHandling();
}

/* Driver Code */
initListener();
//window.addEventListener('GreeterReady', initListener);