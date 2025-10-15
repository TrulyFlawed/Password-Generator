const PasswordGeneratorModule = (function() {
	function getCharset(includeLowercase, includeUppercase, includeNumbers, includeSymbols, excludeAmbiguous) {
		const lowercaseCharset = excludeAmbiguous ? "abcdefghijkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz"; // Excluding "l" and "I" if checked
		const uppercaseCharset = excludeAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Excluding "I" and "O" if checked
		const numberCharset = excludeAmbiguous ? "23456789" : "0123456789"; // Excluding "0" and "1" if checked
		const symbolCharset = "!@#$%^&*";
	
		let charset = "";
		if (includeLowercase) charset += lowercaseCharset;
		if (includeUppercase) charset += uppercaseCharset;
		if (includeNumbers) charset += numberCharset;
		if (includeSymbols) charset += symbolCharset;
	
		return charset;
	}
	
	// Function to ensure minimum numbers and symbols
	function addMinimumChars(password, minNumbers, minSymbols, numberCharset, symbolCharset) {
		let numCount = 0;
		let symbolCount = 0;

		// Add minimum required numbers
		while (numCount < minNumbers) {
			password += numberCharset[Math.floor(Math.random() * numberCharset.length)];
			numCount++;
		}

		// Add minimum required symbols
		while (symbolCount < minSymbols) {
			password += symbolCharset[Math.floor(Math.random() * symbolCharset.length)];
			symbolCount++;
		}

		return password;
	}
	
	function validateInputs(length, minNumbers, minSymbols, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
		// Check if at least one character type is selected
		if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
			alert("Please select at least one character type (lowercase, uppercase, numbers, or symbols).");
			return false;
		}
		
		// Ensure the sum of minNumbers and minSymbols doesn't exceed password length
		if (minNumbers + minSymbols > length) {
			alert("The sum of minimum numbers and symbols cannot exceed the password length.");
			return false;
		}
		
		// Ensure at least one uppercase & one lowercase letter exists in password if both checkboxes are selected
		if ((includeLowercase && includeUppercase) && minNumbers + minSymbols === length-1) {
			alert("At least one uppercase & lowercase letter must be included if both uppercase & lowercase checkboxes are selected. You may need to decrease the minimum number & symbols values to accomplish this.");
			return false;
		}
		
		// Ensure at least one lowercase letter if the lowercase checkbox is selected
		if (includeLowercase && minNumbers + minSymbols === length) {
			alert("At least one lowercase letter must be included if the lowercase checkbox is selected. You may need to decrease the minimum number & symbols values to accomplish this.");
			return false;
		}

		// Ensure at least one uppercase letter if the uppercase checkbox is selected
		if (includeUppercase && minNumbers + minSymbols === length) {
			alert("At least one uppercase letter must be included if the uppercase checkbox is selected. You may need to decrease the minimum number & symbols values to accomplish this.");
			return false;
		}
		
		return true;
	}
	
	function generatePassword() {
		const length = parseInt(document.getElementById('length').value);
		let minNumbers = parseInt(document.getElementById('minNumbers').value);
		let minSymbols = parseInt(document.getElementById('minSymbols').value);

		const includeLowercase = document.getElementById('includeLowercase').checked;
		const includeUppercase = document.getElementById('includeUppercase').checked;
		const includeNumbers = document.getElementById('includeNumbers').checked;
		const includeSymbols = document.getElementById('includeSymbols').checked;
		const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;

		// Dirty, ugly fix to potentially fix an issue with these character sets being unavailable for
		// our if statements which ensure the password has at least one uppercase or lowercase character.
		const lowercaseCharset = excludeAmbiguous ? "abcdefghijkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz"; // Excluding "l" and "I" if checked
		const uppercaseCharset = excludeAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Excluding "I" and "O" if checked

		// Validate inputs
		if (!validateInputs(length, minNumbers, minSymbols, includeLowercase, includeUppercase, includeNumbers, includeSymbols)) {
			return;  // Exit early if validation fails
		}
		
		// If numbers checkbox is unchecked, treat minNumbers as 0
		if (!includeNumbers) {
			minNumbers = 0;
		}

		// If symbols checkbox is unchecked, treat minSymbols as 0
		if (!includeSymbols) {
			minSymbols = 0;
		}
		
		const charset = getCharset(includeLowercase, includeUppercase, includeNumbers, includeSymbols, excludeAmbiguous);
		
		const numberCharset = excludeAmbiguous ? "23456789" : "0123456789"; // Excluding "0" and "1" if checked
    	const symbolCharset = "!@#$%^&*";

		// Ensure password meets minimum numbers and symbols requirement
		let password = "";
		password = addMinimumChars(password, minNumbers, minSymbols, numberCharset, symbolCharset);
		
		// Fill the rest of the password randomly from the selected charset
		for (let i = password.length; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			password += charset[randomIndex];
		}

		// Ensure at least one lowercase letter if required
		if (includeLowercase && !/[a-z]/.test(password)) {
			password = password.slice(0, password.length - 1) + lowercaseCharset[Math.floor(Math.random() * lowercaseCharset.length)];
		}

		// Ensure at least one uppercase letter if required
		if (includeUppercase && !/[A-Z]/.test(password)) {
			password = password.slice(0, password.length - 1) + uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)];
		}
		
		// Shuffle password to randomize the order (to prevent having the numbers and symbols always at the beginning)
		password = shuffleString(password);

		// Display the generated password
		document.getElementById('password').textContent = password;
	}

	// Function to shuffle a string (to mix numbers and symbols into the final password randomly)
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
