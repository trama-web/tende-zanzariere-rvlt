import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, Package, Wrench, MapPin, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: ClipboardCheck,
    title: 'Progetto senza sorprese',
    description: 'Sopralluogo, misure e preventivo chiaro. Sai sempre cosa aspettarti.',
  },
  {
    icon: Package,
    title: 'Materiali selezionati',
    description: 'Alluminio di qualità, tessuti tecnici, motori affidabili.',
  },
  {
    icon: Wrench,
    title: 'Installazione pulita',
    description: 'Rispetto dei tempi e della tua casa. Lasciamo tutto in ordine.',
  },
  {
    icon: MapPin,
    title: 'Assistenza locale',
    description: 'Teramo e provincia. Interventi rapidi quando serve.',
  },
];

const testimonials = [
  {
    text: 'Precisi, puntuali e trasparenti. Consigliati!',
    author: 'Marco',
    location: 'Giulianova',
  },
  {
    text: 'Finalmente una tapparella silenziosa. Grazie!',
    author: 'Anna',
    location: 'Teramo',
  },
  {
    text: 'Consigli utili, zero sprechi. Professionalità.',
    author: 'Luca',
    location: 'Mosciano Sant\'Angelo',
  },
];

const WhyUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      // Benefit cards animation
      const cards = cardsRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 0.4,
            },
          }
        );
      }

      // Testimonials animation
      const testimonialCards = testimonialsRef.current?.querySelectorAll('.testimonial-card');
      if (testimonialCards) {
        gsap.fromTo(
          testimonialCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: 'top 80%',
              end: 'top 60%',
              scrub: 0.4,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="perche-noi"
      className="section-shell relative z-[80] w-full bg-[#F4F1EA] py-20 lg:py-28"
    >
      <div
        className="section-wash"
        style={{
          background:
            'radial-gradient(circle at 14% 20%, rgba(214,160,74,0.18), transparent 22%), radial-gradient(circle at 88% 28%, rgba(94,139,111,0.14), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.4), rgba(244,241,234,0.06))',
        }}
      />
      <div className="px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="relative mb-12 lg:mb-16">
          <span className="mb-4 inline-flex rounded-full bg-[#d6a04a]/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8e6421]">
            Metodo RV/LT
          </span>
          <h2 className="font-heading font-black text-[#1B1F24] text-3xl lg:text-5xl tracking-tight uppercase mb-4 max-w-3xl">
            Perché scegliere RV/LT
          </h2>
          <p className="text-[#6D7278] text-lg lg:text-xl max-w-2xl leading-relaxed">
            Lavoriamo come partner, non come fornitori. Il linguaggio visivo qui cambia ritmo: schede piu luminose, piu aria e contenuti meno seriali.
          </p>
        </div>

        {/* Benefit Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card bg-white/90 rounded-[28px] card-shadow p-6 lg:p-8 transition-transform hover:scale-[1.02] backdrop-blur-sm"
              style={{
                transform: `rotate(${index % 2 === 0 ? '-1.2deg' : '1.2deg'})`,
              }}
            >
              <div className="w-12 h-12 bg-[#1B1F24] rounded-2xl flex items-center justify-center mb-5">
                <benefit.icon className="w-6 h-6 text-[#D6A04A]" />
              </div>
              <h3 className="font-heading font-bold text-[#1B1F24] text-lg mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#6D7278] text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h3 className="font-heading font-bold text-[#1B1F24] text-xl mb-0 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#D6A04A]" />
            Cosa dicono i clienti
          </h3>
          <p className="max-w-xl text-sm leading-6 text-[#6D7278]">
            Un blocco piu editoriale, non la solita fila di recensioni identiche.
          </p>
        </div>
        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card rounded-[28px] card-shadow p-6 lg:p-8"
              style={{
                background:
                  index === 1
                    ? 'linear-gradient(135deg, #d6a04a, #bf8751)'
                    : index === 2
                      ? 'linear-gradient(135deg, #35523c, #1b1f24)'
                      : 'linear-gradient(135deg, #1b1f24, #30353d)',
              }}
            >
              <p className="text-[#F4F1EA] text-base lg:text-lg leading-relaxed mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[#D6A04A] font-semibold text-sm">
                  {testimonial.author}
                </span>
                <span className="text-white/60 text-sm">
                  — {testimonial.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
