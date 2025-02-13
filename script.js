/**********************************************************/
/* FLICKER ANIMATION */

// function to randomly decide order for flicker animation
function triggerRandomFlicker() {

    // get list of elements to have flicker animation applied
    const flickerTitles = document.querySelectorAll('.title');

    flickerTitles.forEach((div) => div.classList.remove('flicker-animation'));

    // get random order
    const firstIndex = Math.random() < 0.5 ? 0 : 1;
    const secondIndex = 1 - firstIndex;

    // perform the flicker for the first title
    flickerTitles[firstIndex].classList.add('flicker-animation');
    setTimeout(() => {
        flickerTitles[firstIndex].classList.remove('flicker-animation');

        // perform the flicker for the second title after some delay
        setTimeout(() => {
            flickerTitles[secondIndex].classList.add('flicker-animation');

            setTimeout(() => {
                flickerTitles[secondIndex].classList.remove('flicker-animation');

                // repeat every 3s
                setTimeout(triggerRandomFlicker, 3000);
            }, 1000);
        }, 500);       // delay between flickers
    }, 1000);

}

/**********************************************************/
/* ZOOM IN ON IMAGE */

function zoomInOnImage() {
    const prof = document.getElementById('profile-img');

    // Get the position of the zoom target
    const targetRect = prof.getBoundingClientRect();

    // Calculate the center of the target area
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    // Calculate the transform origin and scale
    const scale = 2; // Zoom level (2x)
    const offsetX = window.innerWidth / 2 - targetCenterX - 15;
    const offsetY = window.innerHeight / 2 - targetCenterY;

    // Apply the zoom effect
    document.body.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    document.body.style.transformOrigin = 'center center';
}

/**********************************************************/

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


/**********************************************************/
/* DROPDOWN MENU CODE */

// function to fill dropdown menu with usernames of system and display first host in username field
function getUsernames() {
    const usertext = document.getElementById('username');
    const dropdown = document.getElementById('dropdown-menu');

    // get user list and set username field to first user in the list
    const userlist = lightdm.users;
    usertext.value = userlist[0].username;

    // fill dropdown menu with usernames
    userlist.forEach((user) => {
        // create a li item and append to the ul
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(user.username.trim()));

        dropdown.appendChild(li);
    })
}

// function to drop menu when clicked
function dropMenu() {
    const userText = document.getElementById('username');
    const dropDown = document.getElementById('dropdown-menu');

    // handle click on usertext
    userText.addEventListener('click', () => {
        dropDown.classList.toggle('active');
    })

    // handle option selection
    dropDown.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', () => {
            userText.value = option.textContent;
            userText.style.textAlign = 'center';

            dropDown.classList.remove('active');
        });
    });
}

// function to load the menu functions in the correct order
function loadMenu() {
    getUsernames();
    dropMenu();
}

/**********************************************************/



/**********************************************************/
/* CSS CODE */

// function to load a css file
function loadCSS(filename) {

    // create a new link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filename;
    link.setAttribute('dynamic-css', 'true');

    // append the link element to the head
    document.head.appendChild(link);
}

// function to check if a css file has been loaded
// it does not check the name of the css file, only if a link element exists in the html file
function checkCSS() {
    const existingLink = document.querySelector('link');

    if(existingLink.href == "css/lain.css") {
        return true;
    } else {
        return false;
    }
}

// function to remove a css link
function removeCSS() {
    const existingLink = document.querySelector('link[dynamic-css]');
    if(existingLink) {
        existingLink.remove();
    }
}

// function to load the lain theme
function loadLainTheme() {
    // if the lain theme has already been loaded, then don't load it again
    if(checkCSS()) {
        return;
    }

    // get all the elements to be modified
    const leftDiv = document.getElementById('left');
    const profileContainer = document.getElementById('profile-container');
    const rightDiv = document.getElementById('right');
    const loginButton = document.getElementById('login-button');

    // load the lain css
    loadCSS('./css/lain.css');

    // set the profile image
    const image = document.createElement('img');
    image.id = "profile-img";
    image.className = "profile";
    image.src = "./assets/lain.gif";
    image.alt = "lain gif";
    profileContainer.appendChild(image);    

    // set the leftDiv text
    leftDiv.children[0].innerHTML = 'Welcome';
    leftDiv.children[1].innerHTML = 'to';

    // set the rightDiv text
    rightDiv.children[0].innerHTML = 'the';
    rightDiv.children[1].innerHTML = 'Wired';

    // configure the button
    loginButton.innerText = 'enter the wired';

    // call the title flicker function
    triggerRandomFlicker();
}

// function to load ender lily theme
function loadLilyTheme() {
    // if a css file has already been loaded, don't load it again
    if(checkCSS()) {
        return;
    }

     // get all the elements to be modified
     const leftDiv = document.getElementById('left');
     const profileContainer = document.getElementById('profile-container');
     const rightDiv = document.getElementById('right');
     const loginButton = document.getElementById('login-button');

     // load the ender lilies css
     loadCSS("./css/ender_lilies.css");

     // set the profile image
    const image = document.createElement('img');
    image.id = "profile-img";
    image.className = "profile";
    image.src = "./assets/ender_lilies.png";
    image.alt = "lily image";
    profileContainer.appendChild(image);    

    // set the leftDiv text
    leftDiv.children[0].innerHTML = 'Ender';
    leftDiv.children[1].innerHTML = 'Quietus of';

    // set the rightDiv text
    rightDiv.children[0].innerHTML = 'Lilies';
    rightDiv.children[1].innerHTML = 'the Knights';

    // configure the button
    loginButton.innerText = 'Purify';

    // add the rain animation
    createRain();
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

/**********************************************************/
  
/**********************************************************/
/* WEB GREETER CODE */

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

// function to init greeter
async function initListener() {
    // load a random theme and the dropdown menu
    if(Math.random() > 0.5) {
        loadLainTheme();
    } else {
        loadLilyTheme();
    }
    loadMenu();
    

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

/**********************************************************/


/* Driver Code */
window.addEventListener('GreeterReady', initListener);