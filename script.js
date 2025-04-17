const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 8,
      spaceBetween: 15,
    },
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination-bullets',
    typeof: 'bullets',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const arrow = button.querySelector('.arrow');

    content.classList.toggle('hidden');
    arrow.classList.toggle('rotate-180');
  });
});

////

const toggleBtn = document.getElementById('toggleMenu');
const menuCategorias = document.getElementById('menuCategorias');

const navLinks = document.querySelectorAll('nav a');
const departamentos = menuCategorias.querySelectorAll('ul > li'); // todos os li de categorias

////////

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const nomeDepto = link.textContent.trim().toLowerCase();

    menuCategorias.classList.remove('hidden');

    // Mostra somente o departamento correspondente
    departamentos.forEach(li => {
      const textoLi = li.querySelector('a').textContent.trim().toLowerCase();

      if (textoLi === nomeDepto) {
        li.classList.remove('hidden');
      } else {
        li.classList.add('hidden');
      }
    });
  });
});

toggleBtn.addEventListener('click', () => {
  menuCategorias.classList.toggle('hidden');
});

//////
const closeMenuCategorias = e => {
  setTimeout(() => {
    if (!menuCategorias.matches(':hover') && !toggleBtn.matches(':hover')) {
      menuCategorias.classList.add('hidden');
    }
  }, 100);
};

// Hide menu when mouse leaves both elements
toggleBtn.addEventListener('mouseleave', closeMenuCategorias);

menuCategorias.addEventListener('mouseleave', e => {
  // Small delay to allow moving to the toggle button
  setTimeout(() => {
    // Check if neither element is being hovered
    if (!menuCategorias.matches(':hover') && !toggleBtn.matches(':hover')) {
      menuCategorias.classList.add('hidden');
    }
  }, 100);
});

// Fechar o menu se clicar fora dele
document.addEventListener('click', e => {
  const isClickInside = toggleBtn.contains(e.target) || menuCategorias.contains(e.target);
  if (!isClickInside) {
    menuCategorias.classList.add('hidden');
  }
});

///// funcionalidade busca
function buscar() {
  const termoBusca = document.getElementById('campoBusca').value.trim().toLowerCase();
  const resultado = document.getElementById('resultadoBusca');
  const slides = document.querySelectorAll('.swiper-slide');

  if (termoBusca === '') {
    resultado.textContent = 'Digite algo para buscar.';
    slides.forEach(slide => (slide.style.display = 'block'));
    swiper.update();
    return;
  }

  resultado.textContent = `Você buscou por: '${termoBusca}'`;

  let encontrou = false;

  slides.forEach(slide => {
    const nome = slide.dataset.nome.toLowerCase();
    if (nome.includes(termoBusca)) {
      slide.style.display = 'block';
      encontrou = true;
    } else {
      slide.style.display = 'none';
    }
  });

  if (!encontrou) {
    resultado.textContent += ' (Nenhum produto encontrado)';
  }

  swiper.update(); // atualiza o swiper com os itens visíveis
}
