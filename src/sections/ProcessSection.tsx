import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, FileText, Settings, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Sopralluogo e misure',
    description: 'Veniamo a trovarti, valutiamo lo spazio e capiamo le tue esigenze.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Proposta e preventivo',
    description: 'Ti presentiamo soluzioni, materiali e costi chiari. Nessuna sorpresa.',
  },
  {
    number: '03',
    icon: Settings,
    title: 'Installazione',
    description: 'Montaggio preciso e pulito, nel rispetto dei tempi concordati.',
  },
  {
    number: '04',
    icon: HeartHandshake,
    title: 'Assistenza',
    description: 'Restiamo disponibili per manutenzione e riparazioni nel tempo.',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );

      // Steps animation
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      if (stepCards) {
        gsap.fromTo(
          stepCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 0.4,
            },
          }
        );
      }

      // Numbers animation
      const numbers = stepsRef.current?.querySelectorAll('.step-number');
      if (numbers) {
        gsap.fromTo(
          numbers,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              end: 'top 50%',
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
      id="processo"
      className="section-shell relative z-[90] w-full bg-[#1B1F24] py-20 lg:py-28"
    >
      <div
        className="section-wash"
        style={{
          background:
            'radial-gradient(circle at 10% 18%, rgba(214,160,74,0.16), transparent 22%), radial-gradient(circle at 85% 24%, rgba(255,255,255,0.08), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(27,31,36,0.06))',
        }}
      />
      <div className="px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <span className="mb-4 inline-flex rounded-full bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d6a04a]">
            Flusso di lavoro
          </span>
          <h2 className="font-heading font-black text-[#F4F1EA] text-3xl lg:text-5xl tracking-tight uppercase mb-4 max-w-3xl">
            Come lavoriamo
          </h2>
          <p className="text-[#B8BEC7] text-lg lg:text-xl max-w-2xl leading-relaxed">
            Un processo semplice e trasparente, dalla prima visita all'assistenza.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card relative rounded-[28px] p-6 lg:p-8 transition-colors"
              style={{
                background:
                  index % 2 === 0
                    ? 'linear-gradient(160deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))'
                    : 'linear-gradient(160deg, rgba(214,160,74,0.08), rgba(255,255,255,0.02))',
                border: '1px solid rgba(244,241,234,0.1)',
              }}
            >
              {/* Number */}
              <span className="step-number absolute top-6 right-6 font-heading font-black text-4xl lg:text-5xl text-[#D6A04A]/20">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 bg-[#D6A04A]/10 rounded-2xl flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-[#D6A04A]" />
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-[#F4F1EA] text-lg mb-3">
                {step.title}
              </h3>
              <p className="text-[#B8BEC7] text-sm leading-relaxed">
                {step.description}
              </p>
              <div className="mt-5 h-1.5 w-16 rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-[#D6A04A]"
                  style={{ width: `${55 + index * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
