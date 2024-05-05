document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const passwordVerificationInput = document.getElementById('password-verification-input');
    const meterSections = document.querySelectorAll('.meter-section');
    const passwordStrengthText = document.getElementById('password-strength-text');
    const passwordMatchStatus = document.getElementById('password-match-status');

    passwordInput.addEventListener('input', () => {
        updateMeter();
        displayPasswordMatchStatus();
    });

    passwordVerificationInput.addEventListener('input', () => {
        displayPasswordMatchStatus();
    });

    function updateMeter() {
        const password = passwordInput.value;
        let strength = calculatePasswordStrength(password);

        meterSections.forEach((section) => {
            section.classList.remove('weak', 'medium', 'strong', 'very-strong');
        });

        if (strength >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            meterSections[3].classList.add('very-strong');
            meterSections[2].classList.add('strong');
            meterSections[1].classList.add('medium');
            meterSections[0].classList.add('weak');
            passwordStrengthText.textContent = 'Très Fort';
        } else if (strength >= 6 || (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password))) {
            meterSections[2].classList.add('strong');
            meterSections[1].classList.add('medium');
            meterSections[0].classList.add('weak');
            passwordStrengthText.textContent = 'Fort';
        } else if (strength >= 6 || (/[A-Z]/.test(password) && /[a-z]/.test(password))) {
            meterSections[1].classList.add('medium');
            meterSections[0].classList.add('weak');
            passwordStrengthText.textContent = 'Moyen';
        } else if (strength >= 6 || (/[A-Z]/.test(password) || /[a-z]/.test(password) || /\d/.test(password) || /[^A-Za-z0-9]/.test(password))) {
            meterSections[0].classList.add('weak');
            passwordStrengthText.textContent = 'Faible';
        } else {
            passwordStrengthText.textContent = '';
        }
    }

    function calculatePasswordStrength(password) {
        const lengthWeight = 0.2;
        const uppercaseWeight = 0.5;
        const lowercaseWeight = 0.5;
        const numberWeight = 0.7;
        const symbolWeight = 1;

        let strength = 0;

        strength += password.length * lengthWeight;

        if (/[A-Z]/.test(password)) {
            strength += uppercaseWeight;
        }

        if (/[a-z]/.test(password)) {
            strength += lowercaseWeight;
        }

        if (/\d/.test(password)) {
            strength += numberWeight;
        }

        if (/[^A-Za-z0-9]/.test(password)) {
            strength += symbolWeight;
        }

        return strength;
    }

    function displayPasswordMatchStatus() {
        const password = passwordInput.value;
        const verification = passwordVerificationInput.value;

        if (password === verification && password !== '') {
            passwordMatchStatus.textContent = 'Les mots de passe correspondent.';
            passwordMatchStatus.style.color = 'green';
        } else if (verification === '') {
            passwordMatchStatus.textContent = '';
        } else {
            passwordMatchStatus.textContent = 'Les mots de passe ne correspondent pas.';
            passwordMatchStatus.style.color = 'red';
        }
    }
});