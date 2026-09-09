import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  CircleCheck,
  Eye,
  LockKeyhole,
  Play,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import depoimentoLuanda from "@/assets/depoimentos/dep1.jpg";
import depoimentoVinicius from "@/assets/depoimentos/dep2.jpg";
import depoimentoGabriel from "@/assets/depoimentos/dep3.jpg";

const CHECKOUT_URL = "#oferta";

const VSL_VIDEO_URL = "";
const UNLOCK_AFTER_SECONDS = 300;
const UNLOCK_STORAGE_KEY = "vsl_unlocked";

function useVslUnlock() {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(UNLOCK_STORAGE_KEY) === "1";
  });
  const [vslStarted, setVslStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (unlocked) return;
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      const current = video.currentTime;
      const last = lastTimeRef.current;
      // Only accumulate real forward playback deltas; ignore seeks.
      if (last !== null && current > last && current - last < 1.5) {
        playedRef.current += current - last;
      }
      lastTimeRef.current = current;
      if (playedRef.current >= UNLOCK_AFTER_SECONDS) {
        window.sessionStorage.setItem(UNLOCK_STORAGE_KEY, "1");
        setUnlocked(true);
      }
    };
    const onSeeked = () => {
      // Reset the baseline so skipped time never counts.
      lastTimeRef.current = video.currentTime;
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("seeked", onSeeked);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [unlocked]);

  const handlePlay = useCallback(() => {
    setVslStarted(true);
    const video = videoRef.current;
    if (video) void video.play();
  }, []);

  return { unlocked, vslStarted, videoRef, handlePlay };
}

const depoimentos = [
  {
    image: depoimentoLuanda,
    alt: "Conversa de depoimento de um cliente de Luanda",
    name: "Cliente de Luanda",
    result: "+8 cm e energia renovada em 7 dias",
    width: 1086,
    height: 1920,
  },
  {
    image: depoimentoVinicius,
    alt: "Conversa de depoimento do cliente Vinícius",
    name: "Vinícius",
    result: "Potência máxima e controlo total",
    width: 940,
    height: 1920,
  },
  {
    image: depoimentoGabriel,
    alt: "Conversa de depoimento do cliente Gabriel",
    name: "Gabriel",
    result: "Venceu a impotência e ejaculação precoce",
    width: 1206,
    height: 1500,
  },
];

const faq = [
  ["Como vou receber o material?", "Após a confirmação do pagamento, você recebe as instruções de acesso."],
  ["É físico ou digital?", "É um material digital."],
  ["Quantas receitas estão incluídas?", "São 10 receitas apresentadas no guia."],
  ["Preciso utilizar todas as receitas?", "Não. O material serve como referência; escolha o que for adequado para você."],
  ["As receitas substituem tratamento médico?", "Não. O material é educativo e não substitui avaliação ou tratamento profissional."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Homem Que Elas Querem na Cama | Guia Digital" },
      { name: "description", content: "Conheça 10 receitas naturais e conhecimentos tradicionais reunidos em um guia digital prático para o bem-estar masculino." },
      { property: "og:title", content: "O Homem Que Elas Querem na Cama | Guia Digital" },
      { property: "og:description", content: "Conheça 10 receitas naturais e conhecimentos tradicionais reunidos em um guia digital prático para o bem-estar masculino." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

function Cta({ children = "QUERO ACESSAR O GUIA AGORA" }: { children?: string }) {
  return (
    <Button variant="conversion" size="conversion" asChild>
      <a href={CHECKOUT_URL}>
        {children}<ChevronRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function TrustLine({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[11px] font-semibold text-muted-foreground sm:text-xs">
      <span className="inline-flex items-center gap-1.5"><LockKeyhole className="size-3.5 text-gold" />Pagamento seguro</span>
      <span className="inline-flex items-center gap-1.5"><Smartphone className="size-3.5 text-gold" />Acesso imediato</span>
      {!compact && <span className="inline-flex items-center gap-1.5"><BookOpen className="size-3.5 text-gold" />Material digital</span>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      {eyebrow && <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-normal text-foreground sm:text-4xl">{title}</h2>
      {copy && <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{copy}</p>}
    </div>
  );
}

function LandingPage() {
  const { unlocked, vslStarted, videoRef, handlePlay } = useVslUnlock();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-14 pt-7 sm:pt-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--wine)_65%,transparent),transparent_68%)]" />
        <div className="-mx-4 -mt-7 flex items-center justify-center gap-1.5 bg-primary px-4 py-2.5 sm:-mt-10">
          <TriangleAlert aria-hidden="true" className="size-3.5 shrink-0 text-primary-foreground" />
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary-foreground">ALERTA: ASSISTA AGORA ENQUANTO O CONTEÚDO ESTÁ DISPONÍVEL</span>
        </div>
        <div className="relative mx-auto max-w-5xl text-center reveal">
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-[2.55rem] font-bold uppercase leading-[1.03] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            O Homem Que Elas<br className="hidden sm:block" /> <span className="text-primary">Querem na Cama</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Descubra 10 receitas naturais e conhecimentos tradicionais reunidos em um guia prático para o homem que quer cuidar melhor da sua rotina, confiança e bem-estar masculino.
          </p>

          <div className="mx-auto mt-7 max-w-3xl">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-gold/30 bg-surface shadow-2xl shadow-primary/15">
              <video ref={videoRef} className="absolute inset-0 h-full w-full" controls playsInline preload="metadata" src={VSL_VIDEO_URL || undefined} />
              {!vslStarted && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--wine),var(--background)_72%)]" />
                  <div className="absolute inset-0 grid place-items-center px-5">
                    <button onClick={handlePlay} aria-label="Reproduzir apresentação em vídeo" className="group grid size-20 place-items-center rounded-full border border-gold/50 bg-primary text-primary-foreground shadow-conversion transition-transform hover:scale-105 sm:size-24">
                      <Play className="ml-1 size-8 fill-current sm:size-10" />
                    </button>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-primary/30"><div className="h-full w-[12%] bg-primary" /></div>
                </>
              )}
            </div>
          </div>

          {unlocked && (
            <div className="mx-auto mt-6 max-w-xl text-center">
              <p className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-gold"><Eye className="size-4" /> Assista até ao final</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Descubra o que existe por trás das 10 receitas e conheça o conteúdo completo do guia.</p>
              <div className="mt-5"><Cta /></div>
              <TrustLine />
            </div>
          )}
        </div>
      </section>

      {unlocked && (
        <>
      <section className="section-rule bg-surface px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Depoimentos reais de clientes angolanos"
            copy="Resultados partilhados por homens que recuperaram a sua masculinidade e confiança."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {depoimentos.map((depoimento) => (
              <article key={depoimento.name} className="overflow-hidden rounded-lg border border-gold/25 bg-card">
                <img
                  src={depoimento.image}
                  alt={depoimento.alt}
                  loading="lazy"
                  width={depoimento.width}
                  height={depoimento.height}
                  className="aspect-[3/4] w-full object-cover object-top"
                />
                <div className="border-t border-border p-4 text-center">
                  <p className="font-display text-lg font-bold uppercase tracking-normal">{depoimento.name}</p>
                  <p className="mt-1 text-xs font-semibold text-gold">✓ Verificado</p>
                  <p className="mt-2 text-sm leading-5 text-muted-foreground">{depoimento.result}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center"><Cta /></div>
        </div>
      </section>

      <section id="oferta" className="section-rule bg-surface px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-xl rounded-lg border border-gold/35 bg-card p-5 shadow-2xl shadow-primary/10 sm:p-9">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Oferta especial</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-normal sm:text-4xl">Acesso ao guia completo</h2>
            <p className="mt-2 text-sm font-semibold uppercase text-muted-foreground">O Homem Que Elas Querem na Cama</p>
          </div>
          <ul className="mx-auto mt-7 max-w-sm space-y-3">
            {["10 receitas naturais","Ingredientes e preparos","Conhecimento tradicional","Contexto sobre bem-estar masculino","Material digital de acesso imediato"].map(item => <li key={item} className="flex items-start gap-3 text-sm"><CircleCheck className="mt-0.5 size-4 shrink-0 text-gold"/><span>{item}</span></li>)}
          </ul>
          <div className="my-7 border-y border-border py-6 text-center">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Pagamento único</p>
            <p className="font-display text-6xl font-bold tracking-normal text-foreground">3.000 <span className="text-2xl text-gold">Kz</span></p>
            <p className="mt-1 text-xs text-muted-foreground">Acesso digital</p>
          </div>
          <div className="text-center"><Cta /><TrustLine /></div>
        </div>
      </section>

      <section className="section-rule px-4 py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="grid size-20 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10"><ShieldCheck className="size-10 text-gold" /></div>
          <div className="min-w-0 flex-1 text-center">
            <h2 className="font-display text-3xl font-bold uppercase tracking-normal">Você tem 7 dias de garantia</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Você pode conhecer o material conforme as condições da oferta e contar com 7 dias de garantia.</p>
          </div>
        </div>
      </section>

      <section className="section-rule bg-surface px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading title="Perguntas frequentes" />
          <Accordion type="single" collapsible className="space-y-2">
            {faq.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`} className="rounded-lg border border-border bg-card px-4">
                <AccordionTrigger className="min-h-14 text-left text-sm font-bold hover:no-underline">{question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-muted-foreground">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-rule relative overflow-hidden px-4 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--wine)_80%,transparent),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <SectionHeading title="Conheça o guia agora" copy="Tenha acesso ao material completo por apenas 3.000 Kz." />
          <Cta>QUERO ACESSAR AGORA</Cta>
          <TrustLine compact />
        </div>
      </section>

      <footer className="border-t border-border px-4 py-7 text-center text-[11px] leading-5 text-muted-foreground">
        <p>Material educativo. Não substitui avaliação, diagnóstico ou tratamento profissional.</p>
        <p className="mt-1">© 2026 O Homem Que Elas Querem na Cama</p>
      </footer>
        </>
      )}
    </main>
  );
}