import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t, i18n } = useTranslation('global');

  const lang = i18n.language;
  const isArabic = lang === 'ar';

  return (
    <section
      id="hero"
      className="w-full min-h-[90vh] flex items-center justify-center bg-[url('/images/hero-bg.jpg')] px-4 sm:px-6 bg-cover bg-center"
      data-aos="fade-up"
    >
      <div
        className={`flex flex-col gap-5 w-full max-w-4xl -translate-y-8 `}
      >
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-semibold text-olive-dark">
          {t('hero.header')}
        </h2>

        <p className="text-lg md:text-2xl w-4/6 md:w-3/6 text-olive ">
          {t('hero.text')}
        </p>

        <div className={`flex `}>
          <a
            href="#products"
            className="block bg-olive text-white font-medium py-2 px-4 rounded hover:opacity-90 transition text-sm sm:text-base"
          >
            {t('hero.button')}
          </a>
        </div>
      </div>
    </section>
  );
}
