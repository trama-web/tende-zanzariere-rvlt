import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const headlineWords = 'TENDE, ZANZARIERE E AUTOMAZIONI SU MISURA'.split(' ');

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const cardCRef = useRef<HTMLDivElement>(null);
  const cardDRef = useRef<HTMLDivElement>(null);
  const cardERef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = [cardARef.current, cardBRef.current, cardCRef.current, cardDRef.current, cardERef.current].filter(Boolean);
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        cardARef.current,
        { xPercent: -28, yPercent: -6, opacity: 0, rotate: -4 },
        { xPercent: 0, yPercent: 0, opacity: 1, rotate: -2, duration: 0.9 },
        0
      )
        .fromTo(
          cardBRef.current,
          { xPercent: 24, yPercent: -8, opacity: 0, rotate: 3 },
          { xPercent: 0, yPercent: 0, opacity: 1, rotate: 1, duration: 0.9 },
          0.08
        )
        .fromTo(
          cardCRef.current,
          { xPercent: -18, yPercent: 18, opacity: 0, rotate: -2 },
          { xPercent: 0, yPercent: 0, opacity: 1, rotate: 1, duration: 0.9 },
          0.16
        )
        .fromTo(
          cardDRef.current,
          { yPercent: 18, opacity: 0, scale: 0.94 },
          { yPercent: 0, opacity: 1, scale: 1, duration: 0.82 },
          0.24
        )
        .fromTo(
          cardERef.current,
          { xPercent: 18, yPercent: 18, opacity: 0, rotate: 2 },
          { xPercent: 0, yPercent: 0, opacity: 1, rotate: -1, duration: 0.86 },
          0.32
        );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.44, stagger: 0.04 },
          0.34
        );
      }

      gsap.fromTo(
        cards,
        { filter: 'brightness(0.94)' },
        {
          filter: 'brightness(1)',
          duration: 1.1,
          stagger: 0.06,
          ease: 'sine.out',
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;

    const ctx = gsap.context(() => {
      const cards = [cardARef.current, cardBRef.current, cardCRef.current, cardDRef.current, cardERef.current].filter(Boolean);
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.38, 1],
            directional: true,
            duration: { min: 0.2, max: 0.42 },
            ease: 'power2.inOut',
            inertia: false,
          },
        },
      });

      scrollTl
        .to(cardARef.current, { xPercent: -26, yPercent: -18, rotate: -7, opacity: 0.12, ease: 'power2.inOut' }, 0.72)
        .to(cardBRef.current, { xPercent: 24, yPercent: -16, rotate: 6, opacity: 0.12, ease: 'power2.inOut' }, 0.74)
        .to(cardCRef.current, { xPercent: -18, yPercent: 22, rotate: -4, opacity: 0.14, ease: 'power2.inOut' }, 0.76)
        .to(cardDRef.current, { yPercent: 28, scale: 0.9, opacity: 0.08, ease: 'power2.inOut' }, 0.79)
        .to(cardERef.current, { xPercent: 18, yPercent: 16, rotate: 7, opacity: 0.08, ease: 'power2.inOut' }, 0.77)
        .to(cards, { filter: 'blur(6px)', duration: 0.16, ease: 'power1.inOut' }, 0.86)
        .to(cards, { opacity: 0, duration: 0.16, ease: 'power1.out' }, 0.94);
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section ref={sectionRef} className="section-shell relative z-10 bg-[#f4f1ea] px-4 pb-8 pt-24">
        <div
          className="section-wash"
          style={{
            background:
              'radial-gradient(circle at 15% 15%, rgba(214,160,74,0.22), transparent 24%), radial-gradient(circle at 85% 30%, rgba(78, 108, 89, 0.18), transparent 22%), linear-gradient(180deg, rgba(255,255,255,0.65), rgba(244,241,234,0))',
          }}
        />
        <div className="relative mx-auto grid max-w-md gap-4">
          <div
            ref={cardBRef}
            className="rounded-[2rem] bg-[#1b1f24] p-6 text-[#f4f1ea] shadow-[0_22px_44px_rgba(27,31,36,0.16)]"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6a04a]">
              Installazione e assistenza in provincia di Teramo
            </p>
            <h1 ref={headlineRef} className="font-heading text-[2rem] font-black uppercase leading-[0.92] tracking-tight">
              {headlineWords.map((word, i) => (
                <span key={i} className="word mr-[0.22em] inline-block">
                  {word}
                </span>
              ))}
            </h1>
          </div>

          <div className="grid grid-cols-[1.3fr_0.9fr] gap-4">
            <div
              ref={cardARef}
              className="overflow-hidden rounded-[1.9rem] shadow-[0_20px_40px_rgba(27,31,36,0.14)]"
            >
              <img src="/hero_patio.jpg" alt="Tende da sole" className="h-[16rem] w-full object-cover" />
            </div>
            <div
              ref={cardDRef}
              className="overflow-hidden rounded-[1.9rem] shadow-[0_20px_40px_rgba(27,31,36,0.14)]"
            >
              <img src="/hero_living.jpg" alt="Interni" className="h-[16rem] w-full object-cover" />
            </div>
          </div>

          <div
            ref={cardCRef}
            className="rounded-[2rem] bg-white p-5 text-[#1b1f24] shadow-[0_20px_40px_rgba(27,31,36,0.12)]"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#d6a04a]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8e6421]">
                Sopralluogo rapido
              </span>
              <span className="rounded-full bg-[#546b59]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#35523c]">
                Soluzioni su misura
              </span>
            </div>
            <p className="text-sm leading-7 text-[#4f5458]">
              Progettiamo tende da sole, zanzariere, tapparelle, automazioni, porte e riparazioni con un impianto visivo piu ordinato e piu leggibile anche su schermi piccoli.
            </p>
          </div>

          <div className="grid grid-cols-[0.95fr_1.05fr] gap-4">
            <div
              ref={cardERef}
              className="overflow-hidden rounded-[1.9rem] shadow-[0_20px_40px_rgba(27,31,36,0.14)]"
            >
              <img src="/hero_detail.jpg" alt="Dettaglio" className="h-[12rem] w-full object-cover" />
            </div>
            <div className="rounded-[1.9rem] bg-[#d6a04a] p-5 text-white shadow-[0_18px_40px_rgba(214,160,74,0.22)]">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/80">RV / LT</p>
              <p className="mt-3 text-sm leading-6">
                Design piu dinamico, spazi reali e CTA sempre raggiungibili senza testi che escono dalle card.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => document.getElementById('tende')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1b1f24] px-4 py-4 text-sm font-semibold text-[#f4f1ea]"
            >
              Scopri i servizi
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="https://wa.me/393463018748"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-4 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <a
            href="tel:+393463018748"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1b1f24]/12 bg-white px-4 py-4 text-sm font-semibold text-[#1b1f24]"
          >
            <Phone className="h-4 w-4" />
            Chiama ora
          </a>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="section-shell relative z-10 h-screen bg-[#f4f1ea]">
      <div
        className="section-wash"
        style={{
          background:
            'radial-gradient(circle at 12% 14%, rgba(214,160,74,0.24), transparent 18%), radial-gradient(circle at 88% 18%, rgba(65, 98, 78, 0.2), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.48), rgba(244,241,234,0.12))',
        }}
      />

      <div
        ref={cardARef}
        className="absolute overflow-hidden rounded-[32px] shadow-[0_24px_48px_rgba(27,31,36,0.18)]"
        style={{ left: '6vw', top: '10vh', width: '34vw', height: '34vh' }}
      >
        <img src="/hero_patio.jpg" alt="Tende da sole" className="h-full w-full object-cover" />
      </div>

      <div
        ref={cardBRef}
        className="absolute rounded-[32px] bg-[#1b1f24] p-8 text-[#f4f1ea] shadow-[0_28px_56px_rgba(27,31,36,0.22)] lg:p-12"
        style={{ left: '44vw', top: '10vh', width: '50vw', height: '34vh' }}
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#d6a04a]">
          Installazione e assistenza in provincia di Teramo
        </p>
        <h1 ref={headlineRef} className="font-heading text-2xl font-black uppercase leading-[0.95] tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
          {headlineWords.map((word, i) => (
            <span key={i} className="word mr-[0.25em] inline-block">
              {word}
            </span>
          ))}
        </h1>
      </div>

      <div
        ref={cardCRef}
        className="absolute flex flex-col justify-between rounded-[32px] bg-white/85 p-6 text-[#1b1f24] shadow-[0_24px_48px_rgba(27,31,36,0.16)] backdrop-blur-sm lg:p-10"
        style={{ left: '6vw', top: '50vh', width: '34vw', height: '40vh' }}
      >
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#d6a04a]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8e6421]">
              Soluzioni tecniche
            </span>
            <span className="rounded-full bg-[#546b59]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#35523c]">
              Installazione pulita
            </span>
          </div>
          <p className="text-sm leading-7 text-[#4f5458] lg:text-base">
            Progettiamo soluzioni su misura per casa e lavoro con una presentazione piu ariosa, piu leggibile e meno ripetitiva.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => document.getElementById('tende')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full bg-[#1b1f24] px-5 py-3 text-sm font-semibold text-[#f4f1ea]"
          >
            Scopri i servizi
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="tel:+393463018748"
            className="inline-flex items-center gap-2 rounded-full border border-[#1b1f24]/12 px-5 py-3 text-sm font-semibold text-[#1b1f24]"
          >
            <Phone className="h-4 w-4" />
            Chiama
          </a>
        </div>
      </div>

      <div
        ref={cardDRef}
        className="absolute hidden overflow-hidden rounded-[32px] shadow-[0_24px_48px_rgba(27,31,36,0.16)] md:block"
        style={{ left: '44vw', top: '50vh', width: '26vw', height: '40vh' }}
      >
        <img src="/hero_living.jpg" alt="Interni" className="h-full w-full object-cover" />
      </div>

      <div
        ref={cardERef}
        className="absolute hidden overflow-hidden rounded-[32px] shadow-[0_24px_48px_rgba(27,31,36,0.16)] lg:block"
        style={{ left: '73vw', top: '50vh', width: '21vw', height: '40vh' }}
      >
        <img src="/hero_detail.jpg" alt="Dettaglio" className="h-full w-full object-cover" />
      </div>
    </section>
  );
};

export default HeroSection;
