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
/* DROPDOWN MENU CODE */

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

/**********************************************************/



/**********************************************************/
/* WEB GREETER CODE */

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

// function to remove a css link
function removeCSS() {
    const existingLink = document.querySelector('link[dynamic-css]');
    if(existingLink) {
        existingLink.remove();
    }
}

// function to load the lain theme
function loadLainTheme() {
    const leftDiv = document.getElementById('left');
    const profileContainer = document.getElementById('profile-container');
    const rightDiv = document.getElementById('right');
    const loginButton = document.getElementById('login-button');

    // load the lain css
    loadCSS('css/lain.css');

    // set the profile image
    const image = document.createElement('img');
    image.id = "profile-img";
    image.className = "profile";
    image.src = "../assets/lain.gif";
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

// function to perform all the init functions
//TODO: 
// add web greeter code
function initListener() {
    // load the lain theme and set the default user
    loadLainTheme();
    dropMenu();
}

/**********************************************************/


/* Driver Code */

initListener();
/*window.addEventListener('GreeterReady', initListener);*/