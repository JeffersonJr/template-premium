import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, Linkedin, Clock, Heart } from "lucide-react";
import logo from "@/assets/logo-optimized.png";
import microsistecMark from "@/assets/microsistec-logo-simbolo.svg";
import { PHONE_LABEL, PHONE_RENT_LABEL, whatsappLink, ADDRESS, HOURS } from "@/data/properties";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SeoNavigation } from "@/components/SeoNavigation";
import { useCookieConsent } from "@/components/CookieConsent";
import { agencySiteSettings, getInstagramProfileUrl } from "@/data/site-config";
import { applyBrazilianPhoneMask } from "@/lib/input-masks";

const nav = [
  { to: "/", label: "Início" },
  { to: "/imoveis", label: "Imóveis" },
  { to: "/empreendimentos", label: "Empreendimentos" },
  { to: "/encomende-seu-imovel", label: "Encomende seu imóvel" },
  { to: "/blog", label: "Blog" },
  { to: "/anunciar", label: "Cadastre seu imóvel" },
  { to: "/trabalhe-conosco", label: "Trabalhe conosco" },
  { to: "/corretores", label: "Nossa Equipe" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

const desktopMenus = [
  {
    label: "Imóveis",
    links: [
      { label: "Comprar", description: "Imóveis selecionados para compra", href: "/imoveis?finalidade=Venda" },
      { label: "Alugar", description: "Opções para morar agora", href: "/imoveis?finalidade=Locação" },
      { label: "Empreendimentos", description: "Novos projetos selecionados", href: "/empreendimentos" },
      { label: "Lançamentos", description: "Descubra as novidades", href: "/empreendimentos?fase=Lançamento" },
      { label: "Encomende seu imóvel", description: "Conte o imóvel que procura", href: "/encomende-seu-imovel" },
    ],
  },
  {
    label: "Anuncie Conosco",
    links: [
      { label: "Cadastre seu imóvel", description: "Divulgue seu imóvel", href: "/anunciar" },
      { label: "Fale com um corretor", description: "Atendimento imediato pelo WhatsApp", href: whatsappLink("Olá! Gostaria de falar com um corretor da Premium House."), external: true },
    ],
  },
  {
    label: "Institucional",
    links: [
      { label: "Sobre", description: "Conheça a nossa história", href: "/sobre" },
      { label: "Nossa Equipe", description: "Conheça nossos corretores", href: "/corretores" },
      { label: "Trabalhe conosco", description: "Faça parte do nosso time", href: "/trabalhe-conosco" },
      { label: "Contato", description: "Fale com a Premium House", href: "/contato" },
    ],
  },
] as const;

const demoSocialIcons = [
  { name: "facebook", Icon: Facebook },
  { name: "twitter", Icon: Twitter },
  { name: "youtube", Icon: Youtube },
  { name: "instagram", Icon: Instagram },
  { name: "linkedin", Icon: Linkedin },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const instagramUrl = getInstagramProfileUrl(agencySiteSettings.instagramUrl);
  useEffect(() => {
    if (!open) return;
    const mobileTrigger = mobileTriggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNavigationRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); return; }
      if (event.key !== "Tab") return;
      const controls = mobileNavigationRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      mobileTrigger?.focus();
    };
  }, [open]);
  useEffect(() => {
    if (!activeMenu) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setActiveMenu(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActiveMenu(null); };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeMenu]);
  return (
    <header ref={headerRef} className="sticky top-0 z-[60] border-b bg-card/90 backdrop-blur">
      <div className="bg-navy text-navy-foreground text-xs">
        <div className="container-x flex min-h-9 items-center justify-between gap-2 py-1 md:h-9 md:py-0">
          <span className="min-w-0 truncate text-[10px] sm:text-[11px] md:text-xs">CRECI 00000-J<span className="hidden md:inline"> · Atendimento de seg. a sáb.</span></span>
          {instagramUrl ? (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold text-navy-foreground transition hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[11px] md:order-2 md:ml-auto md:text-xs"><Instagram className="h-3.5 w-3.5" aria-hidden="true" /><span>Acesse nosso Instagram</span></a>
          ) : (
            <span aria-label="Instagram demonstrativo" className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold text-navy-foreground sm:text-[11px] md:order-2 md:ml-auto md:text-xs"><Instagram className="h-3.5 w-3.5" aria-hidden="true" /><span>Acesse nosso Instagram</span></span>
          )}
          <span className="order-3 hidden items-center gap-5 md:flex"><span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-navy-foreground" /> <strong>Vendas:</strong> {PHONE_LABEL}</span><span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-navy-foreground" /> <strong>Locação:</strong> {PHONE_RENT_LABEL}</span></span>
        </div>
      </div>
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-5">
        <Link to="/" className="shrink-0"><img src={logo} alt="Premium House" width={1280} height={512} className="h-10 w-auto sm:h-14" /></Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Navegação principal">
          {desktopMenus.map((menu) => {
            const isActive = activeMenu === menu.label;
            return (
              <button key={menu.label} type="button" onClick={() => setActiveMenu(isActive ? null : menu.label)} aria-haspopup="true" aria-expanded={isActive} className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-accent text-primary" : "text-navy hover:bg-accent hover:text-primary"}`}>
                {menu.label}<ChevronDown className={`h-4 w-4 transition ${isActive ? "rotate-180" : ""}`} />
              </button>
            );
          })}
          <Link to="/blog" className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition hover:bg-accent hover:text-primary" activeProps={{ className: "bg-accent text-primary" }}>Blog</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Link to="/favoritos" aria-label="Favoritos" className="rounded-full border p-2 text-navy transition hover:border-primary hover:text-primary sm:p-2.5" activeProps={{ className: "border-primary text-primary" }}><Heart className="h-5 w-5" /></Link>
        <a href={whatsappLink("Olá! Gostaria de falar com um corretor da Premium House.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-110 xl:inline-flex">
          <WhatsAppIcon className="h-4 w-4" /> Fale com um corretor
        </a>
        <button ref={mobileTriggerRef} className="rounded-full border p-2 text-navy transition hover:border-primary hover:text-primary sm:p-2.5 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-controls="mobile-primary-navigation" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {activeMenu && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-card shadow-float">
          <div className="container-x py-6">
            {desktopMenus.filter((menu) => menu.label === activeMenu).map((menu) => (
              <div key={menu.label} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {menu.links.map((item) => <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} onClick={() => setActiveMenu(null)} className="group rounded-xl border border-transparent px-4 py-3 transition hover:border-border hover:bg-accent"><span className="block text-sm font-bold text-navy group-hover:text-primary">{item.label}</span><span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span></a>)}
              </div>
            ))}
          </div>
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Menu principal">
          <button type="button" aria-label="Fechar menu" onClick={() => setOpen(false)} className="absolute inset-0 cursor-default bg-navy/35 backdrop-blur-sm" />
          <nav ref={mobileNavigationRef} id="mobile-primary-navigation" className="absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col overflow-y-auto bg-card p-6 shadow-float sm:p-8" aria-label="Navegação principal">
            <div className="flex items-center justify-between border-b pb-5"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Premium House</p><h2 className="mt-1 text-2xl">Navegue pelo site</h2></div><button onClick={() => setOpen(false)} aria-label="Fechar menu" className="rounded-full border p-2 text-navy"><X className="h-5 w-5" /></button></div>
            <div className="mt-7 space-y-5">{desktopMenus.map((menu, index) => <div key={menu.label} className={index ? "border-t pt-5" : undefined}><p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{menu.label}</p>{menu.links.map((item) => <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} onClick={() => setOpen(false)} className="flex rounded-xl px-4 py-3 font-semibold transition hover:bg-accent hover:text-primary">{item.label}</a>)}</div>)}<div className="border-t pt-5"><Link to="/blog" onClick={() => setOpen(false)} className="flex rounded-xl px-4 py-3 font-semibold transition hover:bg-accent hover:text-primary">Blog</Link><Link to="/favoritos" onClick={() => setOpen(false)} className="flex rounded-xl px-4 py-3 font-semibold transition hover:bg-accent hover:text-primary">Favoritos</Link></div></div>
            <a href={whatsappLink("Olá! Gostaria de falar com um corretor da Premium House.")} target="_blank" rel="noreferrer" className="mt-auto flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp font-bold text-primary-foreground"><WhatsAppIcon className="h-5 w-5" /> Fale com um corretor</a>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { openPreferences } = useCookieConsent();
  const col = "space-y-2.5 text-sm text-navy-foreground/70";
  const h = "mb-4 font-sans text-sm font-bold uppercase tracking-widest text-navy-foreground";
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="inline-block rounded-xl bg-card p-3"><img src={logo} alt="Premium House" width={1280} height={512} loading="lazy" className="h-12 w-auto" /></div>
          <p className="mt-5 max-w-sm text-sm text-navy-foreground/70">Imóveis selecionados, atendimento consultivo e transparência em cada etapa da sua negociação. CRECI 00000-J.</p>
          <div role="img" aria-label="Ícones demonstrativos de Facebook, Twitter, YouTube, Instagram e LinkedIn" className="mt-5 flex gap-3">
            {demoSocialIcons.map(({ name, Icon }) => <span key={name} className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-foreground/10 text-navy-foreground/80"><Icon className="h-4 w-4" aria-hidden="true" /></span>)}
          </div>
        </div>
        <div>
          <h4 className={h}>Imóveis</h4>
          <ul className={col}>
            <li><Link to="/imoveis" search={{ finalidade: "Venda" }} className="hover:text-navy-foreground">Comprar</Link></li>
            <li><Link to="/imoveis" search={{ finalidade: "Locação" }} className="hover:text-navy-foreground">Alugar</Link></li>
            {["Apartamento", "Casa", "Cobertura", "Casa de Campo"].map((t) => <li key={t}><Link to="/imoveis" search={{ tipo: t }} className="hover:text-navy-foreground">{t}s</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className={h}>Institucional</h4>
          <ul className={col}>
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-navy-foreground">{n.label}</Link></li>)}
            <li><Link to="/enviar-depoimento" className="hover:text-navy-foreground">Enviar depoimento</Link></li>
            <li><Link to="/demonstracao" className="hover:text-navy-foreground">Demonstração de layouts</Link></li>
            <li><Link to="/politica-de-privacidade" className="hover:text-navy-foreground">Política de privacidade</Link></li>
            <li><button type="button" onClick={openPreferences} className="text-left transition hover:text-navy-foreground focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-foreground">Preferências de cookies</button></li>
          </ul>
        </div>
        <div>
          <h4 className={h}>Contato</h4>
          <ul className="space-y-3 text-sm text-navy-foreground/70">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-navy-foreground" /> Vendas: {PHONE_LABEL}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-navy-foreground" /> Locação: {PHONE_RENT_LABEL}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-navy-foreground" /> contato@premiumhouse.com.br</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-navy-foreground" /> {ADDRESS}</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-navy-foreground" />
              <div className="space-y-0.5">{HOURS.map(([d, t]) => <div key={d}><span className="font-semibold text-navy-foreground">{d}:</span> {t}</div>)}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-foreground/50 md:flex-row">
          <span>© 2026 Premium House Imóveis · Todos os direitos reservados</span>
          <a href="https://www.microsistec.com.br/" target="_blank" rel="noopener noreferrer" className="inline-flex cursor-pointer items-center gap-2 no-underline transition hover:text-navy-foreground focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-foreground"><img src={microsistecMark} alt="" aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />Site Premium por Microsistec</a>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat({ aboveMobileCta = false }: { aboveMobileCta?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = "whatsapp-lead-panel";
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const openWhatsApp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = `Olá! Vim pelo site da Premium House e gostaria de falar com um corretor.\n\nNome: ${data.get("name")}\nE-mail: ${data.get("email")}\nTelefone / WhatsApp: ${data.get("phone")}`;
    const url = new URL(whatsappLink(message));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const panelPosition = aboveMobileCta
    ? "bottom-[10rem] sm:bottom-[6.5rem]"
    : "bottom-20 sm:bottom-[6.5rem]";

  return (
    <>
      {isOpen && <section id={panelId} role="dialog" aria-labelledby="whatsapp-panel-title" className={`fixed ${panelPosition} right-4 z-50 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-float sm:right-6`}>
        <div className="flex items-start justify-between gap-3 bg-whatsapp px-4 py-4 text-white sm:px-5 sm:py-4">
          <div>
            <h2 id="whatsapp-panel-title" className="text-[9px] font-bold">Fale com um corretor</h2>
            <p className="mt-1 text-xs leading-snug text-white/90 sm:text-sm">Preencha seus dados para continuar no WhatsApp.</p>
          </div>
          <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} aria-label="Fechar formulário" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 text-white transition hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={openWhatsApp} className="space-y-3 p-4">
          <label className="sr-only" htmlFor="whatsapp-lead-name">Seu nome</label>
          <input id="whatsapp-lead-name" name="name" autoComplete="name" required placeholder="Seu nome" className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-12 sm:text-base" />
          <label className="sr-only" htmlFor="whatsapp-lead-email">Seu e-mail</label>
          <input id="whatsapp-lead-email" name="email" type="email" autoComplete="email" required placeholder="Seu e-mail" className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-12 sm:text-base" />
          <label className="sr-only" htmlFor="whatsapp-lead-phone">Telefone ou WhatsApp</label>
          <input id="whatsapp-lead-phone" name="phone" type="tel" inputMode="tel" maxLength={15} onChange={applyBrazilianPhoneMask} autoComplete="tel" required placeholder="Telefone / WhatsApp" className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-12 sm:text-base" />
          <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-12 sm:text-base">
            <WhatsAppIcon className="h-4 w-4" aria-hidden="true" /> Continuar no WhatsApp
          </button>
        </form>
      </section>}
      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Fechar formulário do WhatsApp" : "Fale com um corretor pelo WhatsApp"} aria-expanded={isOpen} aria-controls={panelId} className={`fixed right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-float transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 sm:right-6 sm:h-12 sm:w-12 ${aboveMobileCta ? "bottom-24" : "bottom-4"} sm:bottom-6`}>
        {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" /> : <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
      </button>
    </>
  );
}

export function PageShell({ children, afterNewsletter, whatsappAboveMobileCta = false }: { children: ReactNode; afterNewsletter?: ReactNode; whatsappAboveMobileCta?: boolean }) {
  return (<><a href="#conteudo-principal" className="sr-only fixed left-4 top-3 z-[100] rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground focus:not-sr-only focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary">Pular para o conteúdo</a><Header /><main id="conteudo-principal" tabIndex={-1} className="[--site-header-height:6rem] sm:[--site-header-height:7rem] md:[--site-header-height:7.25rem]">{children}</main><NewsletterSignup />{afterNewsletter ?? <SeoNavigation />}<Footer /><WhatsAppFloat aboveMobileCta={whatsappAboveMobileCta} /></>);
}
