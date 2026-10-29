import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "premium-house-cookie-preferences-v1";

type CookiePreferences = {
  necessary: true;
  externalContent: boolean;
  updatedAt: string;
};

type CookieConsentContextValue = {
  preferences: CookiePreferences | null;
  ready: boolean;
  openPreferences: () => void;
  savePreferences: (externalContent: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

function readPreferences(): CookiePreferences | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<CookiePreferences>;
    if (
      parsed.necessary !== true ||
      typeof parsed.externalContent !== "boolean"
    )
      return null;
    return {
      necessary: true,
      externalContent: parsed.externalContent,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(
    null,
  );
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [externalContent, setExternalContent] = useState(false);

  useEffect(() => {
    const saved = readPreferences();
    setPreferences(saved);
    setExternalContent(saved?.externalContent ?? false);
    setBannerOpen(!saved);
    setReady(true);

    const syncPreferences = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next = readPreferences();
      setPreferences(next);
      setExternalContent(next?.externalContent ?? false);
      setBannerOpen(!next);
    };
    window.addEventListener("storage", syncPreferences);
    return () => window.removeEventListener("storage", syncPreferences);
  }, []);

  const savePreferences = useCallback((allowExternalContent: boolean) => {
    const next: CookiePreferences = {
      necessary: true,
      externalContent: allowExternalContent,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* The choice still applies for this page view. */
    }
    setPreferences(next);
    setExternalContent(allowExternalContent);
    setBannerOpen(false);
    setSettingsOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setExternalContent(preferences?.externalContent ?? false);
    setBannerOpen(false);
    setSettingsOpen(true);
  }, [preferences]);

  const handleSettingsOpenChange = useCallback(
    (open: boolean) => {
      setSettingsOpen(open);
      if (!open && !preferences) setBannerOpen(true);
    },
    [preferences],
  );

  const value = useMemo(
    () => ({ preferences, ready, openPreferences, savePreferences }),
    [preferences, ready, openPreferences, savePreferences],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {ready && bannerOpen && (
        <aside
          role="region"
          aria-label="Preferências de cookies"
          className="fixed inset-x-0 bottom-0 z-[120] border-t border-border bg-[#f0f1f3] shadow-[0_-8px_32px_rgba(16,42,76,0.12)]"
        >
          <div className="mx-auto flex max-w-[1760px] flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:gap-8 md:px-8 lg:px-12">
            <p className="min-w-0 flex-1 text-sm leading-6 text-navy/75">
              Este site usa recursos necessários para funcionar. Com sua
              autorização, carregamos mapas, vídeos e tours de provedores
              externos. Você pode mudar sua escolha em Preferências de cookies,
              no rodapé. Saiba mais na{" "}
              <a
                href="/politica-de-privacidade"
                className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Política de Privacidade
              </a>
              {" · "}
              <button
                type="button"
                onClick={openPreferences}
                className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Configurar
              </button>
            </p>
            <div className="grid shrink-0 grid-cols-2 items-center gap-3 md:w-[210px] md:grid-cols-1 md:gap-1.5">
              <button
                type="button"
                onClick={() => savePreferences(true)}
                className="min-h-11 rounded-md bg-navy px-4 text-sm font-semibold text-navy-foreground transition hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Aceitar
              </button>
              <button
                type="button"
                onClick={() => savePreferences(false)}
                className="min-h-10 px-2 text-sm font-semibold text-amber-700 transition hover:text-amber-900 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Só o necessário
              </button>
            </div>
          </div>
        </aside>
      )}
      <Dialog open={settingsOpen} onOpenChange={handleSettingsOpenChange}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Preferências de privacidade</DialogTitle>
            <DialogDescription>
              Escolha quais recursos opcionais podem ser carregados neste
              dispositivo. Você pode alterar sua escolha a qualquer momento pelo
              rodapé.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-navy">Necessários</h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  Sempre ativos
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Armazenamento local usado para recursos essenciais, como lembrar
                seus favoritos e esta preferência.
              </p>
            </div>
            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 focus-within:ring-2 focus-within:ring-primary">
              <span>
                <span className="block font-semibold text-navy">
                  Conteúdo externo
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  Mapas, vídeos e tours virtuais de provedores externos. Esses
                  serviços podem receber dados técnicos de conexão.
                </span>
              </span>
              <input
                type="checkbox"
                checked={externalContent}
                onChange={(event) => setExternalContent(event.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-primary"
              />
            </label>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              onClick={() => savePreferences(false)}
              className="min-h-11 rounded-xl border border-border px-4 text-sm font-semibold text-navy hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Rejeitar opcionais
            </button>
            <button
              type="button"
              onClick={() => savePreferences(externalContent)}
              className="min-h-11 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Salvar preferências
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context)
    throw new Error(
      "useCookieConsent must be used inside CookieConsentProvider.",
    );
  return context;
}

type ConsentFrameProps = {
  src: string;
  title: string;
  className?: string;
  allow?: string;
  allowFullScreen?: boolean;
  referrerPolicy?: React.IframeHTMLAttributes<HTMLIFrameElement>["referrerPolicy"];
};

export function ConsentFrame({
  src,
  title,
  className,
  allow,
  allowFullScreen,
  referrerPolicy,
}: ConsentFrameProps) {
  const { preferences, ready, savePreferences } = useCookieConsent();
  if (preferences?.externalContent) {
    return (
      <iframe
        src={src}
        title={title}
        className={className}
        loading="lazy"
        allow={allow}
        allowFullScreen={allowFullScreen}
        referrerPolicy={referrerPolicy}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-muted px-5 py-8 text-center ${className ?? ""}`}
      role="group"
      aria-label={title}
    >
      <ExternalLink className="h-6 w-6 text-primary" aria-hidden="true" />
      <p className="max-w-md text-sm font-semibold text-navy">{title}</p>
      <p className="max-w-md text-xs leading-5 text-muted-foreground">
        {ready
          ? "Este conteúdo é fornecido por um serviço externo e só será carregado com sua autorização."
          : "Carregando suas preferências de privacidade…"}
      </p>
      <button
        type="button"
        disabled={!ready}
        onClick={() => savePreferences(true)}
        className="min-h-10 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60"
      >
        Permitir conteúdo externo
      </button>
    </div>
  );
}
