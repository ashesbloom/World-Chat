const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    const noise = document.querySelector(".noise");
    // Calculate mouse position relative to the center of the window
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    noise.style.backgroundPosition = `${mouseX * 100}% ${mouseY * 100}%`;
});

document.addEventListener("click", () => {
    cursor.style.transform = "scale(0.8)";
    setTimeout(() => {
        cursor.style.transform = "scale(1)";
    }, 100);
});

document.getElementById("gif-button").addEventListener("click", () => {
    const gifPicker = document.getElementById("gif-picker");
    gifPicker.style.display =
        gifPicker.style.display === "none" ? "block" : "none";
});

document.getElementById("gif-search").addEventListener("input", (e) => {
    const query = e.target.value;
    // Implement GIF search API call and update #gif-results with GIFs
});
