import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import emblem from "@/assets/xclusive_emblem.png.asset.json";
import portrait from "@/assets/editorial_portrait.jpg";
import salon from "@/assets/private_salon.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xclusive — Un paraíso prohibido · Club privado de creadoras" },
      {
        name: "description",
        content:
          "Xclusive by TAMV Online Network: club privado editorial para creadoras independientes. Membresías, salones en vivo y bóveda protegida.",
      },
      { property: "og:title", content: "Xclusive — Un paraíso prohibido" },
      {
        property: "og:description",
        content: "Un club privado editorial para creadoras y sus comunidades más cercanas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- primitives ---------- */

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-shown={shown} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function DemoTag({ children = "DEMO · Sin cargo real" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-cherry/60 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-pearl">
      <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
      {children}
    </span>
  );
}

function PrimaryCta({ children, href = "#acceso" }: { children: ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-signal px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-ember transition-transform duration-500 hover:-translate-y-0.5"
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">→</span>
      <span className="absolute inset-0 -translate-x-full bg-candy transition-transform duration-700 ease-out group-hover:translate-x-0" />
    </a>
  );
}

function GhostCta({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3.5 text-sm tracking-wide text-pearl/90 transition-colors duration-500 hover:border-silver/40 hover:bg-card/60"
    >
      {children}
    </a>
  );
}

/* ---------- sections ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "border-b border-hairline bg-background/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="flex items-baseline gap-3">
          <span className="font-serif text-2xl text-silver-sheen">Xclusive</span>
          <span className="hidden eyebrow sm:inline !text-[0.55rem]">by TAMV</span>
        </a>
        <nav className="hidden items-center gap-10 text-[0.8rem] tracking-wide text-muted-foreground md:flex">
          {[
            ["El club", "#club"],
            ["Membresías", "#membresias"],
            ["Salones", "#salones"],
            ["Bóveda", "#boveda"],
            ["Creadoras", "#estudio"],
          ].map(([l, h]) => (
            <a key={h} href={h} className="transition-colors duration-300 hover:text-pearl">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#acceso"
          className="rounded-full border border-signal/50 px-5 py-2 text-xs tracking-[0.18em] uppercase text-pearl transition-all duration-500 hover:bg-signal hover:shadow-ember"
        >
          Solicitar acceso
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 bg-ember animate-breathe" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-veil" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <div
          className="relative w-[min(78vw,520px)]"
          style={{ transform: `translateY(${y * 0.18}px) scale(${1 - Math.min(y, 600) / 6000})` }}
        >
          <img
            src={emblem.url}
            alt="Emblema de Xclusive: gota de obsidiana y cristal rojo con un árbol escarlata"
            width={1024}
            height={622}
            className="w-full mix-blend-screen [mask-image:radial-gradient(ellipse_55%_60%_at_50%_42%,black_55%,transparent_80%)]"
          />
        </div>

        <Reveal delay={200}>
          <p className="eyebrow mt-2">Club privado · Creadoras independientes · Edición fundadora</p>
        </Reveal>
        <Reveal delay={400}>
          <h1 className="mt-6 font-serif text-5xl leading-[0.95] text-pearl sm:text-7xl lg:text-8xl">
            Lo que se revela
            <br />
            <em className="text-silver-sheen">a pocos</em>, se recuerda siempre.
          </h1>
        </Reveal>
        <Reveal delay={600}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Un espacio editorial donde las creadoras deciden quién entra, qué se muestra y cuánto vale su
            cercanía. Sin ruido. Sin algoritmos que griten. Solo comunidad elegida.
          </p>
        </Reveal>
        <Reveal delay={800} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PrimaryCta>Solicitar invitación</PrimaryCta>
          <GhostCta href="#estudio">Soy creadora</GhostCta>
        </Reveal>
        <Reveal delay={1000} className="mt-8">
          <DemoTag>Lanzamiento privado · Simulación segura</DemoTag>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="eyebrow !text-[0.55rem]">Desciende</span>
        <span className="h-12 w-px bg-gradient-to-b from-silver/60 to-transparent" />
      </div>
    </section>
  );
}

function Manifesto() {
  const words = ["Consentimiento", "Curaduría", "Privacidad", "Cercanía", "Control", "Arte", "Confianza"];
  return (
    <section id="club" className="relative border-y border-hairline py-6">
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-16 font-serif text-3xl italic text-silver/70">
              {w}
              <span className="h-1.5 w-1.5 rotate-45 bg-signal/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-16 px-6 py-32 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-44">
      <Reveal className="lg:col-span-5">
        <figure className="group relative overflow-hidden rounded-xl shadow-deep">
          <img
            src={portrait}
            alt="Retrato editorial en penumbra con luz cereza"
            width={1024}
            height={1408}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between">
            <div>
              <p className="font-serif text-2xl text-pearl">Valentina R.</p>
              <p className="text-xs text-muted-foreground">Fotografía · Ciudad de México</p>
            </div>
            <span className="rounded-full border border-hairline bg-background/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-silver backdrop-blur">
              Perfil editorial · Demo
            </span>
          </figcaption>
        </figure>
      </Reveal>

      <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
        <Reveal>
          <p className="eyebrow">I — El paraíso prohibido</p>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mt-6 font-serif text-4xl leading-[1.02] text-pearl sm:text-6xl">
            No es una plataforma.
            <br />
            <em className="text-silver/80">Es una puerta que se cierra detrás de ti.</em>
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Xclusive nace como un jardín secreto: cada creadora cultiva su propio santuario y elige a quién
            entrega la llave. La estética es de club privado; la arquitectura, de bóveda.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-hairline pt-10">
          {[
            ["03", "niveles de membresía por creadora"],
            ["100%", "contenido verificado y consentido"],
            ["0", "anuncios de terceros en tu espacio"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={400 + i * 120}>
              <p className="font-serif text-4xl text-pearl sm:text-5xl">{n}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const tiers = [
  {
    name: "Insider",
    roman: "I",
    price: "149",
    line: "La primera llave.",
    perks: ["Feed editorial de la creadora", "Mensajes con moderación activa", "Avisos de salones en vivo"],
  },
  {
    name: "VIP Club",
    roman: "II",
    price: "390",
    line: "Dentro del círculo.",
    perks: ["Todo lo de Insider", "Galerías de la bóveda incluidas", "Prioridad en salones privados", "Insignia de miembro visible"],
    featured: true,
  },
  {
    name: "Xtrime Inner Circle",
    roman: "III",
    price: "990",
    line: "Donde casi nadie llega.",
    perks: ["Todo lo de VIP Club", "Sesiones privadas con cupo limitado", "Piezas firmadas digitalmente", "Línea XTRIME VIP CLUB"],
  },
];

function Memberships() {
  return (
    <section id="membresias" className="relative overflow-hidden py-32 lg:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 bg-ember opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">II — Membresías</p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-6 font-serif text-4xl text-pearl sm:text-6xl">
              Tres llaves. <em className="text-silver/80">Una sola puerta.</em>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-muted-foreground">
              Cada creadora define sus propios niveles. Estos son los precios sugeridos de la edición fundadora.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 150}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-xl border p-8 transition-all duration-700 hover:-translate-y-1 lg:p-10 ${
                  t.featured
                    ? "border-signal/40 bg-gradient-to-b from-cherry to-card shadow-ember"
                    : "border-hairline bg-card/70 hover:border-silver/30"
                }`}
              >
                <span className="pointer-events-none absolute -right-4 -top-10 font-serif text-[10rem] leading-none text-pearl/[0.04]">
                  {t.roman}
                </span>
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Nivel {t.roman}</p>
                  {t.featured && (
                    <span className="rounded-full bg-signal px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary-foreground">
                      Más elegido
                    </span>
                  )}
                </div>
                <h3 className="mt-6 font-serif text-4xl text-pearl">{t.name}</h3>
                <p className="mt-2 font-serif text-lg italic text-silver/80">{t.line}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="font-serif text-6xl text-pearl">${t.price}</span>
                  <span className="text-sm text-muted-foreground">MXN / mes</span>
                </p>
                <ul className="mt-8 flex-1 space-y-4 border-t border-hairline pt-8">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-foreground/85">
                      <span className="mt-2 h-1 w-3 shrink-0 bg-signal" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#acceso"
                  className={`mt-10 rounded-full py-3.5 text-center text-sm tracking-wide transition-all duration-500 ${
                    t.featured
                      ? "bg-signal text-primary-foreground hover:bg-candy"
                      : "border border-hairline text-pearl hover:border-signal/50 hover:bg-cherry/50"
                  }`}
                >
                  Reservar mi lugar
                </a>
                <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Simulación segura · Sin cargo real
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Salons() {
  return (
    <section id="salones" className="relative">
      <div className="relative h-[90svh] min-h-[620px] overflow-hidden">
        <img
          src={salon}
          alt="Salón privado en penumbra con sillón de terciopelo burdeos"
          width={1536}
          height={864}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow">III — Salones en vivo</p>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.02] text-pearl sm:text-6xl">
                La luz baja.
                <br />
                <em className="text-silver/80">La puerta se cierra.</em>
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Transmisiones íntimas con entrada controlada, chat moderado en tiempo real y momentos que solo
                existen mientras duran.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-10 max-w-md rounded-xl border border-hairline bg-background/60 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-pearl">
                    <span className="h-2 w-2 rounded-full bg-signal animate-pulse-dot" /> En vivo · Demo
                  </span>
                  <span className="text-xs text-muted-foreground">38 / 40 lugares</span>
                </div>
                <p className="mt-4 font-serif text-2xl text-pearl">Sesión de medianoche · Valentina R.</p>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[95%] bg-gradient-to-r from-candy to-signal" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Sala con entrada controlada y token efímero.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Vault() {
  const items = [
    { k: "Bóveda privada", t: "Archivo protegido", d: "Enlace temporal y acceso verificado. Nada se comparte sin tu llave." },
    { k: "PPV", t: "Compra única", d: "Acceso vinculado a tu cuenta, para siempre. Sin intermediarios visibles." },
    { k: "Moderación", t: "Equipo de confianza", d: "Cada reporte recibe revisión humana. Bloqueos que de verdad bloquean." },
    { k: "Identidad", t: "Creadoras verificadas", d: "Mayoría de edad y consentimiento confirmados antes de publicar." },
  ];
  return (
    <section id="boveda" className="mx-auto max-w-7xl px-6 py-32 lg:px-10 lg:py-44">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">IV — La bóveda</p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.02] text-pearl sm:text-5xl">
              Lujo es <em className="text-silver/80">saber que nadie más mira.</em>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-muted-foreground">
              La confianza es visible, no decorativa. Cada promesa tiene una etiqueta y cada etiqueta, un control
              detrás.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:col-span-8">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={i * 120} className="h-full">
              <div className="group h-full bg-background p-8 transition-colors duration-700 hover:bg-card lg:p-10">
                <p className="eyebrow !text-signal">{it.k}</p>
                <h3 className="mt-5 font-serif text-3xl text-pearl">{it.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                <span className="mt-8 block h-px w-8 bg-silver/40 transition-all duration-700 group-hover:w-20 group-hover:bg-signal" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Studio() {
  const bars = [32, 48, 41, 63, 57, 72, 68, 85, 79, 94, 88, 100];
  return (
    <section id="estudio" className="relative overflow-hidden border-t border-hairline bg-gradient-to-b from-burgundy/40 to-background py-32 lg:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <Reveal>
            <p className="eyebrow">V — Para creadoras</p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.02] text-pearl sm:text-6xl">
              Tu estudio.
              <br />
              <em className="text-silver/80">Tus reglas. Tu precio.</em>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-10 space-y-6">
              {[
                ["Publica", "Feed, galerías protegidas y piezas PPV desde un solo lugar."],
                ["Transmite", "Abre salones con cupo, precio y reglas de entrada."],
                ["Comprende", "Métricas claras de tu comunidad, sin ranking oculto."],
              ].map(([a, b]) => (
                <li key={a} className="flex gap-6 border-b border-hairline pb-6">
                  <span className="w-28 shrink-0 font-serif text-2xl italic text-pearl">{a}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={450} className="mt-10">
            <p className="font-serif text-xl italic text-silver/80">
              “Prepara tu espacio para monetización futura.”
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="rounded-xl border border-hairline bg-card/80 p-6 shadow-deep backdrop-blur lg:p-8">
            <div className="flex items-center justify-between border-b border-hairline pb-5">
              <div>
                <p className="eyebrow">Consola de creadora</p>
                <p className="mt-2 font-serif text-2xl text-pearl">Estudio · Noviembre</p>
              </div>
              <DemoTag>Demo</DemoTag>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                ["Miembros", "1,284", "+12%"],
                ["VIP Club", "312", "+8%"],
                ["Salones", "9", "este mes"],
              ].map(([l, v, d]) => (
                <div key={l} className="rounded-lg border border-hairline bg-background/50 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{l}</p>
                  <p className="mt-2 font-serif text-3xl text-pearl">{v}</p>
                  <p className="mt-1 text-xs text-signal">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-hairline bg-background/50 p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">Crecimiento de comunidad</p>
              <div className="mt-5 flex h-36 items-end gap-2">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-cherry to-signal/80 transition-all duration-700 hover:to-pearl/80"
                    style={{ height: `${h}%`, opacity: 0.45 + i * 0.045 }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-5 text-center text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Datos ilustrativos · Simulación segura
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Access() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <section id="acceso" className="grain relative overflow-hidden py-36 lg:py-48">
      <div className="pointer-events-none absolute inset-0 bg-ember animate-breathe" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <img
            src={emblem.url}
            alt=""
            aria-hidden
            className="mx-auto w-40 mix-blend-screen [mask-image:radial-gradient(ellipse_40%_50%_at_50%_38%,black_50%,transparent_75%)]"
          />
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mt-4 font-serif text-5xl leading-[0.98] text-pearl sm:text-7xl">
            La lista <em className="text-silver-sheen">es corta.</em>
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            Experiencias premium sujetas a disponibilidad y lanzamiento. Deja tu correo y te avisaremos cuando
            tu puerta se abra.
          </p>
        </Reveal>
        <Reveal delay={450}>
          {sent ? (
            <p className="mt-12 font-serif text-2xl italic text-pearl">
              Tu nombre está en la lista. Te escribiremos en voz baja.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSent(true);
              }}
              className="mx-auto mt-12 flex max-w-lg flex-col gap-3 rounded-full border border-hairline bg-background/60 p-2 backdrop-blur-xl sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                aria-label="Correo electrónico"
                className="flex-1 bg-transparent px-5 py-3 text-sm text-pearl placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-signal px-7 py-3 text-sm font-medium text-primary-foreground shadow-ember transition-colors duration-500 hover:bg-candy"
              >
                Solicitar invitación
              </button>
            </form>
          )}
        </Reveal>
        <Reveal delay={600}>
          <p className="mt-6 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
            Solo mayores de 18 años · Sin spam · Puedes salir cuando quieras
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between lg:px-10">
        <div>
          <p className="font-serif text-3xl text-silver-sheen">Xclusive</p>
          <p className="mt-1 font-serif italic text-muted-foreground">“Un paraíso prohibido”</p>
        </div>
        <div className="flex flex-wrap gap-8 text-xs text-muted-foreground">
          <a href="#" className="hover:text-pearl">Términos</a>
          <a href="#" className="hover:text-pearl">Privacidad</a>
          <a href="#" className="hover:text-pearl">Confianza y seguridad</a>
          <a href="#" className="hover:text-pearl">Contacto</a>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 TAMV Online Network · México</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <Manifesto />
      <Story />
      <Memberships />
      <Salons />
      <Vault />
      <Studio />
      <Access />
      <Footer />
    </main>
  );
}
