function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const minNumbers = parseInt(document.getElementById('minNumbers').value);
    const minSpecialChars = parseInt(document.getElementById('minSpecialChars').value);

    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSpecialChars = document.getElementById('includeSpecialChars').checked;
    const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;

    // Define character sets with and without ambiguous characters
    const lowercaseCharset = excludeAmbiguous ? "abcdefghijkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz"; // Excluding "l" and "I" if checked
    const uppercaseCharset = excludeAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Excluding "I" and "O" if checked
    const numberCharset = excludeAmbiguous ? "23456789" : "0123456789"; // Excluding "0" and "1" if checked
    const specialCharset = "!@#$%^&*";

    let charset = "";
    if (includeLowercase) charset += lowercaseCharset;
    if (includeUppercase) charset += uppercaseCharset;
    if (includeNumbers) charset += numberCharset;
    if (includeSpecialChars) charset += specialCharset;

    // Ensure password meets minimum numbers and special characters requirement
    let password = "";
    let numCount = 0;
    let specialCount = 0;

    // Add minimum required numbers and special characters first
    while (numCount < minNumbers) {
        password += numberCharset[Math.floor(Math.random() * numberCharset.length)];
        numCount++;
    }

    while (specialCount < minSpecialChars) {
        password += specialCharset[Math.floor(Math.random() * specialCharset.length)];
        specialCount++;
    }

    // Add the rest of the characters randomly from the selected set
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Shuffle password to randomize the order (to prevent having the numbers and special chars always at the beginning)
    password = shuffleString(password);

    // Display the generated password
    document.getElementById('password').textContent = password;
}

// Function to shuffle a string (to mix numbers and special chars into the final password randomly)
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
    }
    return arr.join('');
}
