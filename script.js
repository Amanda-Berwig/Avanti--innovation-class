// SWIPER JS
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

  pagination: {
    el: '.swiper-pagination-bullets',
    typeof: 'bullets',
    clickable: true,
  },

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

//// MENU NAVEGAÇÃO

const toggleBtn = document.getElementById('toggleMenu');
const menuCategorias = document.getElementById('menuCategorias');

const navLinks = document.querySelectorAll('nav a:not(#toggleMenu)'); // Todos os links exceto o botão de categorias
const departamentos = menuCategorias.querySelectorAll('ul > li'); // todos os li de categorias

// Função para mostrar o departamento específico
function mostrarDepartamento(nomeDepto) {
  menuCategorias.classList.remove('hidden');

  if (nomeDepto === 'todas as categorias') {
    departamentos.forEach(li => {
      li.classList.remove('hidden');
      li.classList.remove('force-hover'); // Remove qualquer simulação de hover anterior
    });
    return;
  }

  // Mostra somente o departamento correspondente
  departamentos.forEach(li => {
    const textoLi = li.querySelector('a').textContent.trim().toLowerCase();

    if (textoLi === nomeDepto) {
      li.classList.remove('hidden');

      // Força o submenu a aparecer explicitamente
      const submenu = li.querySelector('div');
      if (submenu) {
        submenu.style.display = 'flex';
        li.classList.add('force-hover');
      }
    } else {
      // Esconde as outras categorias
      li.classList.add('hidden');
      li.classList.remove('force-hover');

      // Certifica-se de resetar o estilo de qualquer submenu aberto anteriormente
      const submenu = li.querySelector('div');
      if (submenu) {
        submenu.style.display = '';
      }
    }
  });
}

//força o submenu a aparecer
document.addEventListener('DOMContentLoaded', function () {
  const style = document.createElement('style');
  style.textContent = `
    /* Garantir que os elementos dentro do submenu sejam visíveis */
    .force-hover > div * {
      display: revert !important;
    }
   
  `;
  document.head.appendChild(style);

  // Verificar se há algum item de navegação com a classe 'active'
  // e mostrar seu departamento correspondente
  navLinks.forEach(link => {
    if (link.classList.contains('active')) {
      const nomeDepto = link.textContent.trim().toLowerCase();
      mostrarDepartamento(nomeDepto);
    }
  });
});

// Efeito hover para os links de navegação
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const nomeDepto = link.textContent.trim().toLowerCase();
    mostrarDepartamento(nomeDepto);
  });
});

// Quando o mouse sai de um link e não entra no menu, esconder o menu
navLinks.forEach(link => {
  link.addEventListener('mouseleave', closeMenuCategorias);
});

// Mantém o comportamento original do botão Todas as Categorias
toggleBtn.addEventListener('click', () => {
  if (menuCategorias.classList.contains('hidden')) {
    mostrarDepartamento('todas as categorias');
  } else {
    menuCategorias.classList.add('hidden');
  }
});

// Função para fechar o menu com um pequeno delay
function closeMenuCategorias() {
  setTimeout(() => {
    if (
      !menuCategorias.matches(':hover') &&
      !toggleBtn.matches(':hover') &&
      !Array.from(navLinks).some(link => link.matches(':hover'))
    ) {
      menuCategorias.classList.add('hidden');
    }
  }, 100);
}

// Restaura a visualização padrão quando não está mais no hover
function resetSubmenus() {
  departamentos.forEach(li => {
    const submenu = li.querySelector('div');
    if (submenu && !li.matches(':hover')) {
      submenu.style.display = '';
      li.classList.remove('force-hover');
    }
  });
}

// Esconde o menu quando o mouse sai dele
toggleBtn.addEventListener('mouseleave', closeMenuCategorias);

menuCategorias.addEventListener('mouseleave', function () {
  closeMenuCategorias();
  resetSubmenus();
});

///// Busca dinâmica
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

  swiper.update();
}
