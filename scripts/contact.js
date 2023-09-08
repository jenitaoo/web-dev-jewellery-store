const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const telNumber = document.getElementById('telNumber');
const inputMessage = document.getElementById('inputMessage');
const method = document.getElementById('method');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    validateCheckboxes();
    allnumeric();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const telNumberValue = telNumber.value.trim();
    const inputMessageValue = inputMessage.value.trim();
    const methodValue = method.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(telNumberValue === '') {
        setError(telNumber, 'Tel number is required');
    } else {
        setSuccess(telNumber);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please enter a valid email address');
    } else {
        setSuccess(email);
    }

    if(inputMessageValue === '') {
        setError(inputMessage, 'Please enter a message');
    } else {
        setSuccess(inputMessage);
    }

    if(methodValue === '') {
        setError(method, 'Tel number is required');
    } else {
        setSuccess(method);
    }



};

//FUNCTION TO VALIDATE WHETHER ONE OF THE CHECKBOXES FOR MESSAGE TYPE WERE CHOSEN
function validateCheckboxes() {
    var checkBoxes = document.getElementsByClassName( 'myCheckbox' );
    var isChecked = false;
        for (var i = 0; i < checkBoxes.length; i++) {
            if ( checkBoxes[i].checked ) {
                isChecked = true;
            };
        };
        if ( isChecked ) {
            
            } else {
                alert( 'Please check at least one checkbox!' );
            }   
    }

//FUNCTION TO VALIDATE WHETHER THE INPUT FOR PHONE NUMBER IS NUMBERS ONLY
function allnumeric(inputtxt){
   const numbers = /^[0-9]+$/;
   if(inputtxt.value.match(numbers))
   {
        document.form.telNumber.focus();
        return true;
   }
   else
   {
        alert('Please enter numeric characters only!');
        document.form.telNumber.focus();
        return false;
   }
} 
