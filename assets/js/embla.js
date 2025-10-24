document.addEventListener('DOMContentLoaded', function () {
  const emblaNode = document.querySelector('.embla');
  const viewportNode = emblaNode.querySelector('.embla__viewport');
  const dotsContainer = document.querySelector('.embla__dots');

  const autoplay = EmblaCarouselAutoplay({
    delay: 5000,
    stopOnInteraction: true,
  });

  const embla = EmblaCarousel(viewportNode, { loop: true }, [
    EmblaCarouselFade(),
    autoplay,
  ]);

  const totalSlides = embla.slideNodes().length;

  if (dotsContainer) {
    const dots = Array.from({ length: totalSlides }, (_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('embla__dot');
      dot.setAttribute('type', 'button');
      dot.addEventListener('click', () => {
        embla.scrollTo(i);
        autoplay.stop();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    const updateDots = () => {
      const selectedIndex = embla.selectedScrollSnap();
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-selected', i === selectedIndex);
      });
    };

    embla.on('select', updateDots);
    updateDots();
  }
});
