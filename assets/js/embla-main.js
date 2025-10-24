document.addEventListener('DOMContentLoaded', function () {
  const emblaNode = document.querySelector('.embla');
  const viewportNode = emblaNode.querySelector('.embla__viewport');

  const autoplay = EmblaCarouselAutoplay({
    delay: 3000,
    stopOnInteraction: false,
  });

  const embla = EmblaCarousel(viewportNode, { loop: true }, [
    EmblaCarouselFade(),
    autoplay,
  ]);

  const slides = emblaNode.querySelectorAll('.embla__slide img');

  slides.forEach(img => {
    img.addEventListener('click', () => {
      embla.scrollNext();
    });
  });
});
