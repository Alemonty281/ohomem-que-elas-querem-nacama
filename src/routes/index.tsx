import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  CircleCheck,
  Eye,
  FileText,
  Leaf,
  LockKeyhole,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import guiaMockup from "@/assets/guia-mockup.jpg";
import tradicaoImage from "@/assets/conhecimento-tradicional.jpg";

const CHECKOUT_URL = "#oferta";

const receitas = [
  ["Gengibre + Mel", "Infusão simples com ingredientes conhecidos."],
  ["Melancia + Limão", "Uma combinação refrescante para a rotina."],
  ["Mucuna Pruriens", "Apresentada com preparo e recomendações de uso."],
  ["Ginkgo Biloba", "Conheça a receita e a forma de preparo."],
  ["Abacate + Mel", "Uma combinação simples e nutritiva."],
  ["Gengibre + Alho", "Uma receita tradicional para incluir na rotina."],
  ["Beterraba + Laranja", "Smoothie fácil de preparar."],
  ["Tribulus Terrestris", "Conheça o preparo apresentado no material."],
  ["Maca Peruana", "Infusão com orientações de preparo."],
  ["Romã + Banana", "Uma combinação prática para o dia a dia."],
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
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-14 pt-7 sm:pt-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--wine)_65%,transparent),transparent_68%)]" />
        <div className="relative mx-auto max-w-5xl text-center reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-primary/15 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] text-primary-foreground sm:text-xs">
            <span aria-hidden="true">⚠️</span> Oferta especial <span className="text-primary">•</span> Acesso imediato
          </div>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-[2.55rem] font-bold uppercase leading-[1.03] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            O Homem Que Elas<br className="hidden sm:block" /> <span className="text-primary">Querem na Cama</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Descubra 10 receitas naturais e conhecimentos tradicionais reunidos em um guia prático para o homem que quer cuidar melhor da sua rotina, confiança e bem-estar masculino.
          </p>

          <div className="mx-auto mt-7 max-w-3xl">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-gold/30 bg-surface shadow-2xl shadow-primary/15">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--wine),var(--background)_72%)]" />
              <div className="absolute inset-0 grid place-items-center px-5">
                <button aria-label="Reproduzir apresentação em vídeo" className="group grid size-20 place-items-center rounded-full border border-gold/50 bg-primary text-primary-foreground shadow-conversion transition-transform hover:scale-105 sm:size-24">
                  <Play className="ml-1 size-8 fill-current sm:size-10" />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/30"><div className="h-full w-[12%] bg-primary" /></div>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-xl text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-gold"><Eye className="size-4" /> Assista até ao final</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Descubra o que existe por trás das 10 receitas e conheça o conteúdo completo do guia.</p>
            <div className="mt-5"><Cta /></div>
            <TrustLine />
          </div>
        </div>
      </section>

      <section className="section-rule bg-surface px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading title="Não é sobre uma solução milagrosa." copy="É sobre conhecer melhor aquilo que você coloca no seu corpo." />
          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">O guia reúne receitas, combinações de ingredientes e conhecimentos tradicionais apresentados de forma simples para você conhecer e consultar dentro da sua rotina.</p>
        </div>
      </section>

      <section className="section-rule px-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
          <div className="text-center md:order-2">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Raízes & tradição</p>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-normal sm:text-4xl">Antes dos suplementos, existia o conhecimento.</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">Conheça um pouco da história dos Bakongos e a forma como conhecimentos tradicionais sobre ervas, plantas e alimentos foram transmitidos ao longo do tempo.</p>
          </div>
          <img src={tradicaoImage} alt="Ervas, raízes, mel e caderno botânico sobre uma mesa" loading="lazy" width={1408} height={912} className="aspect-[16/10] w-full rounded-lg border border-gold/20 object-cover" />
        </div>
      </section>

      <section className="section-rule bg-surface px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Conteúdo prático" title="10 receitas para conhecer e experimentar" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {receitas.map(([title, copy], index) => (
              <article key={title} className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-gold/40">
                <div className="mb-4 flex items-center justify-between"><span className="font-display text-2xl font-bold text-gold">{String(index + 1).padStart(2, "0")}</span><Leaf className="size-4 text-primary" /></div>
                <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-normal">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center"><Cta /></div>
        </div>
      </section>

      <section className="section-rule px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="Veja por dentro do guia" copy="Conheça o material que você receberá após a confirmação do pagamento." />
          <div className="overflow-hidden rounded-lg border border-gold/25 bg-card">
            <img src={guiaMockup} alt="Capa do guia e páginas digitais com exemplos de receitas" loading="lazy" width={1408} height={1008} className="aspect-[7/5] w-full object-cover" />
            <div className="grid grid-cols-3 border-t border-border">
              {[{icon: BookOpen,label:"Capa premium"},{icon: FileText,label:"Índice claro"},{icon: Sparkles,label:"Receitas ilustradas"}].map(({icon: Icon,label}) => <div key={label} className="flex min-w-0 flex-col items-center gap-2 border-r border-border px-2 py-4 text-center last:border-r-0"><Icon className="size-4 text-gold"/><span className="text-[10px] font-bold uppercase text-muted-foreground sm:text-xs">{label}</span></div>)}
            </div>
          </div>
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
    </main>
  );
}