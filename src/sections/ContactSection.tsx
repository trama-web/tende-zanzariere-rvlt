import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    nome: '',
    telefono: '',
    messaggio: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left card animation
      gsap.fromTo(
        leftCardRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );

      // Right card animation
      gsap.fromTo(
        rightCardRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );

      // Form fields animation
      const fields = formRef.current?.querySelectorAll('.form-field');
      if (fields) {
        gsap.fromTo(
          fields,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              end: 'top 55%',
              scrub: 0.4,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.telefono) {
      toast.error('Per favore, compila nome e telefono');
      return;
    }

    // Simulate form submission
    toast.success('Richiesta inviata! Ti contatteremo presto.');
    setFormData({ nome: '', telefono: '', messaggio: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contatti"
      className="section-shell relative z-[100] w-full bg-[#F4F1EA] py-20 lg:py-28"
    >
      <div
        className="section-wash"
        style={{
          background:
            'radial-gradient(circle at 16% 18%, rgba(214,160,74,0.2), transparent 22%), radial-gradient(circle at 86% 22%, rgba(94,139,111,0.14), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.44), rgba(244,241,234,0.08))',
        }}
      />
      <div className="px-6 lg:px-10">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left - Contact Form Card */}
          <div
            ref={leftCardRef}
            className="bg-[#1B1F24] rounded-[28px] card-shadow p-6 lg:p-10"
          >
            <span className="mb-4 inline-flex rounded-full bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6A04A]">
              Preventivo e assistenza
            </span>
            <h2 className="font-heading font-black text-[#F4F1EA] text-2xl lg:text-4xl tracking-tight uppercase mb-4">
              Parliamo del tuo progetto
            </h2>
            <p className="text-[#B8BEC7] text-sm lg:text-base mb-8">
              Chiedi un sopralluogo gratuito o scrivici per un preventivo.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="form-field">
                <label className="block text-[#B8BEC7] text-sm mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full bg-[#F4F1EA]/10 border border-[#F4F1EA]/20 rounded-xl px-4 py-3 text-[#F4F1EA] placeholder:text-[#6D7278] focus:outline-none focus:border-[#D6A04A] transition-colors"
                  placeholder="Il tuo nome"
                />
              </div>

              <div className="form-field">
                <label className="block text-[#B8BEC7] text-sm mb-2">Telefono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full bg-[#F4F1EA]/10 border border-[#F4F1EA]/20 rounded-xl px-4 py-3 text-[#F4F1EA] placeholder:text-[#6D7278] focus:outline-none focus:border-[#D6A04A] transition-colors"
                  placeholder="Il tuo numero"
                />
              </div>

              <div className="form-field">
                <label className="block text-[#B8BEC7] text-sm mb-2">Messaggio (opzionale)</label>
                <textarea
                  value={formData.messaggio}
                  onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                  rows={4}
                  className="w-full bg-[#F4F1EA]/10 border border-[#F4F1EA]/20 rounded-xl px-4 py-3 text-[#F4F1EA] placeholder:text-[#6D7278] focus:outline-none focus:border-[#D6A04A] transition-colors resize-none"
                  placeholder="Descrivi brevemente la tua richiesta"
                />
              </div>

              <button
                type="submit"
                className="form-field w-full inline-flex items-center justify-center gap-2 bg-[#D6A04A] text-white px-6 py-4 rounded-full text-sm font-semibold hover:bg-[#c2913f] transition-colors"
              >
                <Send className="w-4 h-4" />
                Invia richiesta
              </button>
            </form>
          </div>

          {/* Right - Info Card */}
          <div
            ref={rightCardRef}
            className="bg-white/92 rounded-[28px] card-shadow p-6 lg:p-10 flex flex-col backdrop-blur-sm"
          >
            <h3 className="font-heading font-bold text-[#1B1F24] text-xl mb-6">
              Contatti
            </h3>

            <div className="space-y-5 mb-8">
              <a
                href="tel:+393463018748"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-[#1B1F24] rounded-2xl flex items-center justify-center group-hover:bg-[#D6A04A] transition-colors">
                  <Phone className="w-5 h-5 text-[#F4F1EA]" />
                </div>
                <div>
                  <p className="text-[#6D7278] text-sm">Telefono</p>
                  <p className="text-[#1B1F24] font-semibold">+39 346 301 8748</p>
                </div>
              </a>

              <a
                href="mailto:riccardovalentini84@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-[#1B1F24] rounded-2xl flex items-center justify-center group-hover:bg-[#D6A04A] transition-colors">
                  <Mail className="w-5 h-5 text-[#F4F1EA]" />
                </div>
                <div>
                  <p className="text-[#6D7278] text-sm">Email</p>
                  <p className="text-[#1B1F24] font-semibold text-sm break-all">riccardovalentini84@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1B1F24] rounded-2xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#F4F1EA]" />
                </div>
                <div>
                  <p className="text-[#6D7278] text-sm">Area di intervento</p>
                  <p className="text-[#1B1F24] font-semibold text-sm">
                    Teramo, Giulianova, Mosciano Sant'Angelo, Tortoreto e dintorni
                  </p>
                </div>
              </div>
            </div>

            {/* Map Image */}
            <div className="flex-grow rounded-[20px] overflow-hidden min-h-[200px]">
              <img
                src="/map_teramo.jpg"
                alt="Mappa area di intervento"
                className="w-full h-full object-cover"
              />
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/393463018748"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-full text-sm font-semibold hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Scrivi su WhatsApp
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#1B1F24]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-[#1B1F24]">RV/LT</span>
              <span className="text-[#6D7278] text-sm">Tende Zanzariere</span>
            </div>
            <p className="text-[#6D7278] text-sm">
              P.IVA 02201300676
            </p>
            <p className="text-[#6D7278] text-xs">
              © {new Date().getFullYear()} Tende Zanzariere RV/LT. Tutti i diritti riservati.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
