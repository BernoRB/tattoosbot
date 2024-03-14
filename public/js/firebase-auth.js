// Inicializa Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCW1ePC6KdH2AFKVCS7oGMJAeP_T2SDb_c',
  authDomain: "tattoosbot-ae4dc.firebaseapp.com",
  projectId: 'tattoosbot-ae4dc',
}
firebase.initializeApp(firebaseConfig);

const userElement = document.getElementById('user-info');
const userEmailElement = document.getElementById('user-email');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logout');
const myCollectionElemnt = document.getElementById('myCollection');

function showLoggedIn(user) {
    userElement.style.display = 'block';
    userEmailElement.innerHTML = `&#129492; ${user.email}`;
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
    myCollectionElemnt.style.display = 'block';

    // Envía la información del usuario al servidor
    fetch('/api/userLoggedIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            uid: user.uid,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showLoggedOut() {
    userElement.style.display = 'none';
    userEmailElement.textContent = '';
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
    myCollectionElemnt.style.display = 'none';
}

function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        window.location.href = 'generator.html';
    }).catch((error) => {
        console.error(error);
    });
}

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.reload();
    }).catch((error) => {
        console.error('Error al cerrar sesión', error);
    });
}


// Observador del estado de autenticación
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        showLoggedIn(user);
    } else {
        showLoggedOut();
    }
});

// Añade eventos a botones
document.addEventListener('DOMContentLoaded', () => {
    loginButton.addEventListener('click', googleLogin);
    logoutButton.addEventListener('click', logout);
})

function isUserLoggedIn() {
    return firebase.auth().currentUser != null
}

document.addEventListener('DOMContentLoaded', () => {
    const tryHomeButton = document.getElementById('tryHomeButton')
    tryHomeButton.addEventListener('click', (event) => {
      event.preventDefault()
      // Verifica si el usuario está logeado
      if (isUserLoggedIn()) {
        // Si está logeado, redirige a generator.html
        window.location.href = 'generator.html'
      } else {
        // Si no está logeado, inicia el flujo de login
        googleLogin()
      }
    })
})


document.addEventListener('DOMContentLoaded', () => {
    // Espera a que el estado de autenticación esté listo antes de verificar el acceso a las páginas protegidas
    firebase.auth().onAuthStateChanged(user => {
      const protectedPages = ['/generator.html', 'myCollection.html'];
      if (protectedPages.includes(window.location.pathname)) {
        if (!user) {
          // Si no hay usuario logeado, redirige al inicio o página de login
          window.location.href = '/';
        } 
      }
    });
  });
  
/*
document.addEventListener('DOMContentLoaded', () => {
    const protectedPages = ['/generator.html']; // Añade aquí las rutas protegidas
    if (protectedPages.includes(window.location.pathname)) {
      if (!isUserLoggedIn()) {
        window.location.href = '/'; // Redirige al inicio o página de login
      } 
}})
*/