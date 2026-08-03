const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const preview = document.getElementById("preview");
const imageUrl = document.getElementById("imageUrl");
const copyBtn = document.getElementById("copyBtn");

// Show image preview
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
});

// Upload image
uploadBtn.addEventListener("click", async () => {

    const file = imageInput.files[0];

    if (!file) {
        alert("Please select an image.");
        return;
    }

    uploadBtn.innerHTML = "Uploading...";
    uploadBtn.disabled = true;

    const formData = new FormData();
    formData.append("image", file);

    try {

        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {

            imageUrl.value = data.imageUrl;

            alert("Image uploaded successfully!");

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("Upload failed!");

    }

    uploadBtn.innerHTML = "Upload Image";
    uploadBtn.disabled = false;

});

// Copy URL
copyBtn.addEventListener("click", async () => {

    if (imageUrl.value === "") {
        alert("No URL to copy.");
        return;
    }

    try {

        await navigator.clipboard.writeText(imageUrl.value);

        copyBtn.innerHTML = "Copied!";

        setTimeout(() => {
            copyBtn.innerHTML = "Copy URL";
        }, 2000);

    } catch (err) {

        alert("Copy failed.");

    }

});