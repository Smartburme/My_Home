// Snowflake effect JS
function generateSnowflakes() {
    const snowflakeCount = 50;
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.classList.add('snowflakes');
    document.body.appendChild(snowflakesContainer);

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        const size = Math.random() * 5 + 2;  // Size between 2px and 7px
        const leftPosition = Math.random() * 100 + "%";  // Random X position

        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';
        snowflake.style.left = leftPosition;
        snowflake.style.animationDelay = Math.random() * 5 + "s"; // Random delay
        snowflake.style.animationDuration = Math.random() * 5 + 10 + "s"; // Random falling speed

        snowflakesContainer.appendChild(snowflake);
    }
}

document.addEventListener('DOMContentLoaded', generateSnowflakes);
