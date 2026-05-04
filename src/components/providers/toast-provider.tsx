import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** `info` = mensajes neutros/informativos (azul). `default` queda como alias de `info`. */
export type ToastVariant = "success" | "info" | "warning" | "destructive" | "default";

export interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastRecord {
  id: string;
  title: string;
  description?: string;
  variant: Exclude<ToastVariant, "default">;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 5200;

function normalizeVariant(v?: ToastVariant): Exclude<ToastVariant, "default"> {
  if (!v || v === "default") return "info";
  return v;
}

function ToastIcon({ variant }: { variant: Exclude<ToastVariant, "default"> }) {
  const common = "h-5 w-5 shrink-0";
  switch (variant) {
    case "success":
      return (
        <CheckCircle2 className={cn(common, "text-emerald-700")} aria-hidden />
      );
    case "destructive":
      return <XCircle className={cn(common, "text-red-700")} aria-hidden />;
    case "warning":
      return (
        <AlertTriangle className={cn(common, "text-orange-700")} aria-hidden />
      );
    default:
      return <Info className={cn(common, "text-blue-700")} aria-hidden />;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    const variant = normalizeVariant(input.variant);
    const record: ToastRecord = {
      id,
      title: input.title,
      description: input.description,
      variant,
    };
    setItems((prev) => [...prev, record]);
    window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
  }, [dismiss]);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed top-4 right-4 z-[130] flex max-w-[min(100vw-2rem,22rem)] flex-col gap-3 sm:top-6 sm:right-6"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "toast-pop pointer-events-auto flex gap-3 rounded-xl border-2 px-4 py-3 shadow-lg",
              t.variant === "success" &&
                "border-emerald-500 bg-emerald-50 text-neutral-900",
              t.variant === "info" &&
                "border-blue-500 bg-blue-50 text-neutral-900",
              t.variant === "warning" &&
                "border-orange-500 bg-amber-50 text-neutral-900",
              t.variant === "destructive" &&
                "border-red-600 bg-red-50 text-neutral-900",
            )}
          >
            <ToastIcon variant={t.variant} />
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-semibold leading-snug">{t.title}</p>
              {t.description ? (
                <p className="mt-1 text-xs leading-relaxed text-neutral-700">
                  {t.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md p-1 text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900"
              aria-label="Cerrar notificación"
              onClick={() => dismiss(t.id)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useAppToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useAppToast debe usarse dentro de ToastProvider");
  }
  return ctx;
}
