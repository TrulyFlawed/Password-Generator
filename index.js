const PasswordGeneratorModule = (function() {
	function getCharset(includeLowercase, includeUppercase, includeNumbers, includeSpecialChars, excludeAmbiguous) {
		const lowercaseCharset = excludeAmbiguous ? "abcdefghijkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz"; // Excluding "l" and "I" if checked
		const uppercaseCharset = excludeAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Excluding "I" and "O" if checked
		const numberCharset = excludeAmbiguous ? "23456789" : "0123456789"; // Excluding "0" and "1" if checked
		const specialCharset = "!@#$%^&*";
	
		let charset = "";
		if (includeLowercase) charset += lowercaseCharset;
		if (includeUppercase) charset += uppercaseCharset;
		if (includeNumbers) charset += numberCharset;
		if (includeSpecialChars) charset += specialCharset;
	
		return charset;
	}
	
	// Function to ensure minimum numbers and special characters
	function addMinimumChars(password, minNumbers, minSpecialChars, numberCharset, specialCharset) {
		let numCount = 0;
		let specialCount = 0;

		// Add minimum required numbers
		while (numCount < minNumbers) {
			password += numberCharset[Math.floor(Math.random() * numberCharset.length)];
			numCount++;
		}

		// Add minimum required special characters
		while (specialCount < minSpecialChars) {
			password += specialCharset[Math.floor(Math.random() * specialCharset.length)];
			specialCount++;
		}

		return password;
	}
	
	function validateInputs(length, minNumbers, minSpecialChars, includeLowercase, includeUppercase, includeNumbers, includeSpecialChars) {
		// Check if at least one character type is selected
		if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecialChars) {
			alert("Please select at least one character type (lowercase, uppercase, numbers, or special characters).");
			return false;
		}
		
		// Ensure the sum of minNumbers and minSpecialChars doesn't exceed password length
		if (minNumbers + minSpecialChars > length) {
			alert("The sum of minimum numbers and special characters cannot exceed the password length.");
			return false;
		}
		
		return true;
	}
	
	function generatePassword() {
		const length = parseInt(document.getElementById('length').value);
		const minNumbers = parseInt(document.getElementById('minNumbers').value);
		const minSpecialChars = parseInt(document.getElementById('minSpecialChars').value);

		const includeLowercase = document.getElementById('includeLowercase').checked;
		const includeUppercase = document.getElementById('includeUppercase').checked;
		const includeNumbers = document.getElementById('includeNumbers').checked;
		const includeSpecialChars = document.getElementById('includeSpecialChars').checked;
		const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;

		// Validate inputs
		if (!validateInputs(length, minNumbers, minSpecialChars, includeLowercase, includeUppercase, includeNumbers, includeSpecialChars)) {
			return;  // Exit early if validation fails
		}
		
		const charset = getCharset(includeLowercase, includeUppercase, includeNumbers, includeSpecialChars, excludeAmbiguous);
		
		const numberCharset = excludeAmbiguous ? "23456789" : "0123456789"; // Excluding "0" and "1" if checked
    	const specialCharset = "!@#$%^&*";

		// Ensure password meets minimum numbers and special characters requirement
		let password = "";
		password = addMinimumChars(password, minNumbers, minSpecialChars, numberCharset, specialCharset);
		
		// Fill the rest of the password randomly from the selected charset
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

	return {
		generatePassword,
	};
})();

const passwordGenerationButton = document.querySelector("#generate-password-button");

passwordGenerationButton.addEventListener("click", PasswordGeneratorModule.generatePassword);
