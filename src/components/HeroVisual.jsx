export const HeroVisual = () => (
  <picture>
    <source srcSet="/hero.webp" type="image/webp" />
    <img src="/hero.png" alt="Proton UI" loading="lazy" decoding="async" />
  </picture>
);
