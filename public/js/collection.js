$(window).on('load', function () {
  $('.preloader').fadeOut(100);
});

(function ($) {
  'use strict';

	// navbarDropdown
	if ($(window).width() < 992) {
		$('.navigation .dropdown-toggle').on('click', function () {
			$(this).siblings('.dropdown-menu').animate({
				height: 'toggle'
			}, 300);
		});
	}
})(jQuery)


// MY COLLECTION CON TODOS Y FAVS
// Función para mostrar las imágenes
const displayImages = (images, showFavsOnly = false) => {
  const imagesContainer = document.getElementById('imagesCollection');
  imagesContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevas imágenes

  images.forEach(image => {
    if (showFavsOnly && !image.isFavorite) {
      // Si solo se deben mostrar las favoritas y esta imagen no lo es, continuar al siguiente ciclo
      return;
    }

    // Contenedor de la imagen y el ícono del corazón
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const imgElement = document.createElement('img');
    imgElement.src = image.url;
    imgElement.classList.add('fade-in', 'image-item'); // Agrega 'image-item' para CSS
    imagesContainer.prepend(imgElement);
  });
};

// Evento para cuando se carga el DOM y se establece el estado de autenticación
document.addEventListener('DOMContentLoaded', () => {
  const showAllButton = document.getElementById('showAll');
  const showFavsButton = document.getElementById('showFavs');
  let allImages = []; // Almacena todas las imágenes para no tener que volver a cargarlas

  const toggleButtonSelection = (selectedButton) => {
    showAllButton.classList.remove('button-selected');
    showFavsButton.classList.remove('button-selected');
    selectedButton.classList.add('button-selected');
  };

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      fetch('/api/getUserImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: user.uid }),
      })
      .then(response => response.json())
      .then(data => {
        allImages = data.images; // Guarda todas las imágenes
        displayImages(allImages); // Muestra todas las imágenes por defecto
      })
      .catch(error => console.error('Error:', error));
    } else {
      // Redirige al usuario al inicio o a la página de login si no está logueado
      window.location.href = '/';
    }
  });

  // Eventos para botones
  showAllButton.addEventListener('click', () => {
    toggleButtonSelection(showAllButton);
    displayImages(allImages); // Muestra todas las imágenes
  });

  showFavsButton.addEventListener('click', () => {
    toggleButtonSelection(showFavsButton);
    displayImages(allImages, true); // Muestra solo las favoritas
  });
});



// MODAL LOGICA
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const downloadButton = document.getElementById("downloadButton");
  const backdrop = document.querySelector(".modal-backdrop");

  document.getElementById('imagesCollection').addEventListener('click', function(e) {
    if(e.target.tagName === 'IMG') {
      modal.style.display = "block";
      backdrop.style.display = "block"; // Muestra el fondo oscuro
      modalImg.src = e.target.src;
      downloadButton.onclick = function() {
        // Aquí iría la funcionalidad para descargar la imagen
        console.log("Descargar imagen");
      };
    }
  });

  closeModal.onclick = function() {
    modal.style.display = "none";
    backdrop.style.display = "none"; // Oculta el fondo oscuro
  };

  // Cierra el modal al hacer click en el fondo oscuro
  backdrop.onclick = function() {
    modal.style.display = "none";
    backdrop.style.display = "none"; // Oculta el fondo oscuro
  };

  // Cierra el modal al presionar Escape
  window.addEventListener('keydown', function(event) {
    if(event.key === "Escape") {
      modal.style.display = "none";
      backdrop.style.display = "none"; // Oculta el fondo oscuro
    }
  });
});

window.addEventListener('load', () => {
  // Ajustar la posición del modal después de cargar todo
  adjustModalPosition();
});


function adjustModalPosition() {
  const modal = document.querySelector('.modal');
  if (!modal) return;
  
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const windowHeight = window.innerHeight;
  const modalMaxHeight = windowHeight - navbarHeight - 150;
  
  // Aplicar estilo directamente para ajustar la altura máxima del modal
  modal.style.maxHeight = `${modalMaxHeight}px`;
}

// FAVS-TODOS LOGICA



