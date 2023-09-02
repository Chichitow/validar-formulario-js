const firebaseConfig = {
    apiKey: "AIzaSyB5UYphUpIpEjvL50wtJMIzdY7V65xeAVY",
    authDomain: "datos-de-formulario-34c3b.firebaseapp.com",
    projectId: "datos-de-formulario-34c3b",
    storageBucket: "datos-de-formulario-34c3b.appspot.com",
    messagingSenderId: "1001470910289",
    appId: "1:1001470910289:web:d4eb00f6b27772f9823d70",
    measurementId: "G-R3J8HKP0YY"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()


    //Validar campo "Nombre".
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduci tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }


    //Validar campo "Correo electronico".
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduci un mail válido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }


    //Validar campo "Contraseña".
    let contraseniaEntrada = document.getElementById('password')
    let contraseniaError = document.getElementById('passwordError')
    let contraseniaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contraseniaPattern.test(contraseniaEntrada.value)) {
        contraseniaError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, mayusculas, minusculas, y caracteres especiales.'
        contraseniaError.classList.add('error-message')
    } else {
        contraseniaError.textContent = ''
        contraseniaError.classList.remove('error-message')
    }

    //Si todo los campos son validos enviar fomulario.

    if (!errorNombre.textContent && !emailError.textContent && !contraseniaError.textContent) {

        //BACKEND QUE RECIBA LA INFORMACION
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contraseniaEntrada.value
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con exito', docRef.id);
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error);
            });

    }
})