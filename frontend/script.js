/**********************************************************/
/* CODE FOR FLICKER ANIMATION */

// get list of elements to have flicker animation applied
const flickerTitles = document.querySelectorAll('.title');

// function to randomly decide order for flicker animation
function triggerRandomFlicker() {
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

// run the function every 3s
triggerRandomFlicker();
/**********************************************************/


// temp code
const btn = document.getElementById('login-button');
const prof = document.getElementById('profile-img');
btn.addEventListener('click', () => {
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
});