import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

interface ServiceSectionProps {
  id: string;
  tag: string;
  headline: string;
  description: string;
  cta: string;
  image: string;
  secondaryImage?: string;
  layout: 'left-wide' | 'left-tall';
  zIndex: number;
}

const sectionThemes: Record<string, { accent: string; accentSoft: string; ink: string; glow: string; badge: string; stats: [string, string] }> = {
  tende: {
    accent: '#D6A04A',
    accentSoft: 'rgba(214,160,74,0.18)',
    ink: '#1B1F24',
    glow: 'rgba(214,160,74,0.22)',
    badge: '#8E6421',
    stats: ['Schermature tecniche', 'Montaggi puliti'],
  },
  zanzariere: {
    accent: '#5E8B6F',
    accentSoft: 'rgba(94,139,111,0.18)',
    ink: '#163126',
    glow: 'rgba(94,139,111,0.24)',
    badge: '#35523C',
    stats: ['Profili su misura', 'Reti resistenti'],
  },
  tapparelle: {
    accent: '#556270',
    accentSoft: 'rgba(85,98,112,0.18)',
    ink: '#1F2730',
    glow: 'rgba(85,98,112,0.24)',
    badge: '#3B4652',
    stats: ['Isolamento termico', 'Chiusura silenziosa'],
  },
  automazioni: {
    accent: '#C56B43',
    accentSoft: 'rgba(197,107,67,0.18)',
    ink: '#382116',
    glow: 'rgba(197,107,67,0.24)',
    badge: '#7F452B',
    stats: ['Motori affidabili', 'Comandi smart'],
  },
  porte: {
    accent: '#7A5C8C',
    accentSoft: 'rgba(122,92,140,0.18)',
    ink: '#291B34',
    glow: 'rgba(122,92,140,0.2)',
    badge: '#5A406D',
    stats: ['Ingresso protetto', 'Finiture curate'],
  },
  riparazioni: {
    accent: '#B75D5D',
    accentSoft: 'rgba(183,93,93,0.18)',
    ink: '#351818',
    glow: 'rgba(183,93,93,0.22)',
    badge: '#7A3838',
    stats: ['Interventi rapidi', 'Ricambi compatibili'],
  },
};

const ServiceSection = ({
  id,
  tag,
  headline,
  description,
  cta,
  image,
  secondaryImage,
  layout,
  zIndex,
}: ServiceSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const theme = sectionThemes[id] ?? sectionThemes.tende;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        const mobileCards = section.querySelectorAll('.service-mobile-reveal');
        gsap.fromTo(
          mobileCards,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
            },
          }
        );
        return;
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=185%',
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.42, 1],
            directional: true,
            duration: { min: 0.2, max: 0.46 },
            ease: 'power2.inOut',
            inertia: false,
          },
        },
      });

      if (layout === 'left-wide') {
        scrollTl
          .fromTo(imageRef.current, { xPercent: -22, rotate: -3, opacity: 0 }, { xPercent: 0, rotate: -1, opacity: 1, ease: 'power2.out' }, 0.02)
          .fromTo(textCardRef.current, { xPercent: 18, yPercent: 4, rotate: 3, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: 1, opacity: 1, ease: 'power2.out' }, 0.08)
          .fromTo(eyebrowRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.16);
      } else {
        scrollTl
          .fromTo(imageRef.current, { xPercent: -16, yPercent: 8, rotate: -2, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, ease: 'power2.out' }, 0.04)
          .fromTo(textCardRef.current, { xPercent: 18, yPercent: -6, rotate: 3, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, ease: 'power2.out' }, 0.09)
          .fromTo(secondaryImageRef.current, { yPercent: 20, scale: 0.96, opacity: 0 }, { yPercent: 0, scale: 1, opacity: 1, ease: 'power2.out' }, 0.14)
          .fromTo(eyebrowRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.18);
      }

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, ease: 'power1.out' }, 0.18);
      }

      const exitStart = layout === 'left-wide' ? 0.73 : 0.69;
      scrollTl
        .to(imageRef.current, { xPercent: -20, yPercent: 12, rotate: -5, opacity: 0.12, filter: 'blur(5px)', ease: 'power2.inOut' }, exitStart)
        .to(textCardRef.current, { xPercent: 16, yPercent: -12, rotate: 4, opacity: 0.1, filter: 'blur(5px)', ease: 'power2.inOut' }, exitStart + 0.03);

      if (secondaryImageRef.current) {
        scrollTl.to(secondaryImageRef.current, { yPercent: 18, rotate: 4, opacity: 0.12, filter: 'blur(5px)', ease: 'power2.inOut' }, exitStart + 0.04);
      }

      scrollTl.to([imageRef.current, textCardRef.current, secondaryImageRef.current].filter(Boolean), { opacity: 0, duration: 0.14 }, 0.95);
    }, section);

    return () => ctx.revert();
  }, [isMobile, layout]);

  const headlineWords = headline.split(' ');
  const isCallCta = cta.toLowerCase().includes('chiama');
  const ctaHref = isCallCta ? 'tel:+393463018748' : '#contatti';
  const ctaContent = (
    <>
      {isCallCta ? <Phone className="h-4 w-4" /> : null}
      {cta}
      {!isCallCta ? <ArrowRight className="h-4 w-4" /> : null}
    </>
  );

  if (isMobile) {
    return (
      <section ref={sectionRef} id={id} className="section-shell relative px-4 py-8" style={{ zIndex }}>
        <div
          className="section-wash"
          style={{
            background: `radial-gradient(circle at 20% 14%, ${theme.glow}, transparent 22%), radial-gradient(circle at 84% 78%, ${theme.accentSoft}, transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.45), rgba(244,241,234,0.08))`,
          }}
        />
        <div className="relative mx-auto max-w-md space-y-4">
          <div className="service-mobile-reveal flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ backgroundColor: theme.accentSoft, color: theme.badge }}
            >
              {tag}
            </span>
            <span className="h-px flex-1 bg-[#1b1f24]/10" />
          </div>

          <div className="service-mobile-reveal overflow-hidden rounded-[2rem] shadow-[0_20px_44px_rgba(27,31,36,0.14)]">
            <img src={image} alt={tag} className="h-[16.5rem] w-full object-cover" />
          </div>

          <div className="service-mobile-reveal rounded-[2rem] p-6 shadow-[0_22px_44px_rgba(27,31,36,0.14)]" style={{ backgroundColor: theme.ink }}>
            <div className="mb-4 flex flex-wrap gap-2">
              {theme.stats.map((stat) => (
                <span key={stat} className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ backgroundColor: 'rgba(255,255,255,0.09)', color: theme.accent }}>
                  {stat}
                </span>
              ))}
            </div>
            <h2 className="font-heading text-[2rem] font-black uppercase leading-[0.92] tracking-tight text-[#f4f1ea]">
              {headline}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#d4d8dd]">{description}</p>
            <a
              href={ctaHref}
              onClick={(e) => {
                if (!isCallCta) {
                  e.preventDefault();
                  document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: theme.accent }}
            >
              {ctaContent}
            </a>
          </div>

          {secondaryImage ? (
            <div className="service-mobile-reveal grid grid-cols-[0.95fr_1.05fr] gap-4">
              <div className="overflow-hidden rounded-[1.8rem] shadow-[0_18px_38px_rgba(27,31,36,0.14)]">
                <img src={secondaryImage} alt={`${tag} dettaglio`} className="h-[11.5rem] w-full object-cover" />
              </div>
              <div className="rounded-[1.8rem] bg-white/90 p-5 shadow-[0_18px_38px_rgba(27,31,36,0.12)] backdrop-blur-sm">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: theme.badge }}>
                  Focus
                </p>
                <p className="mt-3 text-sm leading-6 text-[#4f5458]">
                  Materiali, finiture e dettagli con una seconda immagine che spezza il ritmo e non replica sempre lo stesso schema.
                </p>
              </div>
            </div>
          ) : (
            <div className="service-mobile-reveal rounded-[1.8rem] border border-[#1b1f24]/8 bg-white/85 p-5 shadow-[0_18px_38px_rgba(27,31,36,0.1)] backdrop-blur-sm">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: theme.badge }}>
                Dettaglio progetto
              </p>
              <p className="mt-3 text-sm leading-6 text-[#4f5458]">
                Ogni sezione mobile ora usa blocchi dedicati, spazi piu coerenti e un flusso leggibile senza testi compressi o card che saltano.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id={id} className="section-shell relative h-screen bg-[#f4f1ea]" style={{ zIndex }}>
      <div
        className="section-wash"
        style={{
          background: `radial-gradient(circle at 12% 18%, ${theme.glow}, transparent 20%), radial-gradient(circle at 84% 24%, ${theme.accentSoft}, transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.54), rgba(244,241,234,0.1))`,
        }}
      />

      {layout === 'left-wide' ? (
        <>
          <div
            ref={imageRef}
            className="absolute overflow-hidden rounded-[32px] shadow-[0_24px_48px_rgba(27,31,36,0.16)]"
            style={{ left: '6vw', top: '10vh', width: '62vw', height: '80vh' }}
          >
            <img src={image} alt={tag} className="h-full w-full object-cover" />
          </div>

          <div
            ref={textCardRef}
            className="absolute flex flex-col justify-between rounded-[32px] p-7 shadow-[0_28px_58px_rgba(27,31,36,0.2)] lg:p-8"
            style={{ left: '71vw', top: '10vh', width: '23vw', height: '80vh', backgroundColor: theme.ink }}
          >
            <div ref={eyebrowRef} className="flex flex-wrap gap-2">
              <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ backgroundColor: theme.accentSoft, color: theme.accent }}>
                {tag}
              </span>
              <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/72">
                {theme.stats[0]}
              </span>
            </div>
            <div className="py-4">
              <h2 ref={headlineRef} className="font-heading text-2xl font-black uppercase leading-[0.95] tracking-tight text-[#f4f1ea] lg:text-3xl xl:text-4xl">
                {headlineWords.map((word, i) => (
                  <span key={i} className="word mr-[0.2em] inline-block">
                    {word}
                  </span>
                ))}
              </h2>
              <p className="mt-6 text-sm leading-7 text-[#c4cad2]">{description}</p>
            </div>
            <div>
              <div className="mb-5 rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
                  Punto forte
                </p>
                <p className="mt-2 text-sm leading-6 text-[#d9dde2]">{theme.stats[1]}</p>
              </div>
              <a
                href={ctaHref}
                onClick={(e) => {
                  if (!isCallCta) {
                    e.preventDefault();
                    document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: theme.accent }}
              >
                {ctaContent}
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            ref={imageRef}
            className="absolute overflow-hidden rounded-[32px] shadow-[0_24px_48px_rgba(27,31,36,0.16)]"
            style={{ left: '6vw', top: '10vh', width: '34vw', height: '80vh' }}
          >
            <img src={image} alt={tag} className="h-full w-full object-cover" />
          </div>

          <div
            ref={textCardRef}
            className="absolute rounded-[32px] p-7 shadow-[0_28px_58px_rgba(27,31,36,0.16)] lg:p-8"
            style={{ left: '44vw', top: '10vh', width: '50vw', height: '34vh', background: `linear-gradient(135deg, ${theme.ink}, rgba(27,31,36,0.92))` }}
          >
            <div ref={eyebrowRef} className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ backgroundColor: theme.accentSoft, color: theme.accent }}>
                {tag}
              </span>
              <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/72">
                {theme.stats[0]}
              </span>
            </div>
            <h2 ref={headlineRef} className="font-heading text-2xl font-black uppercase leading-[0.95] tracking-tight text-[#f4f1ea] lg:text-3xl xl:text-4xl">
              {headlineWords.map((word, i) => (
                <span key={i} className="word mr-[0.2em] inline-block">
                  {word}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-[90%] text-sm leading-7 text-[#c9cfd7]">{description}</p>
          </div>

          {secondaryImage ? (
            <div
              ref={secondaryImageRef}
              className="absolute hidden overflow-hidden rounded-[32px] shadow-[0_24px_48px_rgba(27,31,36,0.16)] md:block"
              style={{ left: '44vw', top: '50vh', width: '50vw', height: '40vh' }}
            >
              <img src={secondaryImage} alt={`${tag} dettaglio`} className="h-full w-full object-cover" />
            </div>
          ) : null}

          <div
            className="absolute rounded-[28px] border border-[#1b1f24]/8 bg-white/86 p-5 shadow-[0_20px_42px_rgba(27,31,36,0.12)] backdrop-blur-sm"
            style={{ left: '44vw', top: secondaryImage ? '40vh' : '52vh', width: secondaryImage ? '19vw' : '24vw' }}
          >
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: theme.badge }}>
              Focus
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4f5458]">{theme.stats[1]}</p>
            <a
              href={ctaHref}
              onClick={(e) => {
                if (!isCallCta) {
                  e.preventDefault();
                  document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: theme.badge }}
            >
              {cta}
              {!isCallCta ? <ArrowRight className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
            </a>
          </div>
        </>
      )}
    </section>
  );
};

export default ServiceSection;
