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


// GENERATE IMAGE
document.getElementById('sendButton').addEventListener('click', async function() {
  var text = document.getElementById('textInput').value;
  var style = document.getElementById('styleSelect').value;
  document.getElementById('textOutput').textContent = 'Procesando...';

  // Obtén el UID del usuario autenticado
  const user = firebase.auth().currentUser;
  const uid = user ? user.uid : null;
  const email = user ? user.email : null;

  fetch('/api/generateImage', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, style, uid, email }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'succeeded' && data.imageUrl) {
          document.getElementById('textOutput').textContent = ''
          const imgElement = document.createElement('img')
          imgElement.src = data.imageUrl
          imgElement.className = "img-fluid image-result img-thumbnail m-2"
          document.getElementById('imageOutput').prepend(imgElement)

          // TODO Aca tengo el conteo, decidir que hacer con esto
          document.getElementById('textOutput').textContent = data.updatedCount
      } else if(data.status == 'error' & data.reason == 'no_subscription') {
        // Lo mandamos a subscribirse
        window.location.href = '/subscription.html'
      }
      else {
          document.getElementById('textOutput').textContent = 'Error o estado no exitoso: ' + data.status
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      document.getElementById('textOutput').textContent = 'Error en la solicitud.';
  })
})


