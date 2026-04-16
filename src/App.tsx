import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ServiceSection from './sections/ServiceSection';
import WhyUsSection from './sections/WhyUsSection';
import ProcessSection from './sections/ProcessSection';
import ContactSection from './sections/ContactSection';
import WhatsAppButton from './sections/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 350);

    window.addEventListener('load', onLoad);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen overflow-x-clip bg-[#f4f1ea]">
      <div className="grain-overlay" />
      <div className="page-vignette" />
      <Navigation />
      <HeroSection />
      <ServiceSection
        id="tende"
        tag="TENDE DA SOLE"
        headline="OMBRA SU MISURA"
        description="Tende tecniche ed estetiche per balconi, terrazzi e vetrine. Tessuti anti-UV, strutture in alluminio e assistenza continua."
        cta="Richiedi un sopralluogo"
        image="/hero_patio.jpg"
        layout="left-wide"
        zIndex={20}
      />
      <ServiceSection
        id="zanzariere"
        tag="ZANZARIERE"
        headline="ARIA PULITA, ZERO PUNTURE"
        description="Zanzariere avvolgibili, laterali e fisse con profili su misura, rete resistente e chiusure precise."
        cta="Vedi le soluzioni"
        image="/zanzariera_window.jpg"
        secondaryImage="/zanzariera_bedroom.jpg"
        layout="left-tall"
        zIndex={30}
      />
      <ServiceSection
        id="tapparelle"
        tag="TAPPARELLE"
        headline="SICUREZZA E SILENZIO"
        description="Tapparelle in alluminio e PVC, coibentate e resistenti: isolamento termico, sicurezza e chiusura silenziosa."
        cta="Scopri i materiali"
        image="/tapparella_security.jpg"
        layout="left-wide"
        zIndex={40}
      />
      <ServiceSection
        id="automazioni"
        tag="AUTOMAZIONI"
        headline="COMANDO CON UN TOCCO"
        description="Motori silenziosi per tapparelle e tende, centralini per serrande, telecomandi e integrazione con domotica."
        cta="Parliamo del tuo progetto"
        image="/automazione_remote.jpg"
        secondaryImage="/automazione_garage.jpg"
        layout="left-tall"
        zIndex={50}
      />
      <ServiceSection
        id="porte"
        tag="PORTE"
        headline="INGRESSO SU MISURA"
        description="Porte blindate e d'arredo, vetrate scorrevoli e sistemi di chiusura personalizzati per stile e sicurezza."
        cta="Richiedi un preventivo"
        image="/porte_entrance.jpg"
        layout="left-wide"
        zIndex={60}
      />
      <ServiceSection
        id="riparazioni"
        tag="RIPARAZIONI"
        headline="ASSISTENZA VELOCE"
        description="Interventi su tapparelle, serrande, avvolgibili e chiusure. Pezzi di ricambio, manutenzione e consigli concreti."
        cta="Chiama ora"
        image="/riparazione_kit.jpg"
        secondaryImage="/riparazione_facade.jpg"
        layout="left-tall"
        zIndex={70}
      />
      <WhyUsSection />
      <ProcessSection />
      <ContactSection />
      <WhatsAppButton />
    </div>
  );
}

export default App;
