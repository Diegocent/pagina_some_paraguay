import { X } from "lucide-react";
import { useEffect } from "react";

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

export function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const year = new Date().getFullYear();

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-6 py-5">
          <h2
            id="privacy-title"
            className="text-lg font-bold tracking-tight text-neutral-900"
          >
            Política de Privacidad y Términos de Uso
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 text-sm leading-relaxed text-neutral-700 space-y-6">
          <p className="text-xs text-neutral-500">
            Última actualización: {year} · Aplicable en la República del Paraguay.
          </p>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">1. Responsable del sitio</h3>
            <p>
              El presente sitio web es operado por <strong>SOME Paraguay</strong>,
              con actividad comercial en la República del Paraguay, en adelante «el
              Titular». Para consultas sobre privacidad o términos podés contactarnos
              a través del formulario de la sección <em>Contacto</em> o por WhatsApp.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">2. Datos que recopilamos</h3>
            <p>
              Al completar el formulario de contacto o el proceso de compra,
              solicitamos los siguientes datos personales:
            </p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>Nombre y apellido</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Dirección de envío (si corresponde)</li>
            </ul>
            <p>
              No recopilamos datos de tarjetas de crédito ni información de pago
              directamente; los pagos se coordinan fuera de la plataforma.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">3. Finalidad del tratamiento</h3>
            <p>Los datos recabados se utilizan exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>Procesar y coordinar pedidos de productos.</li>
              <li>Responder consultas de clientes.</li>
              <li>Coordinar envíos y entregas.</li>
              <li>Enviar confirmaciones de pedido por correo electrónico.</li>
            </ul>
            <p>
              No comercializamos ni cedemos tus datos personales a terceros con fines
              publicitarios.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">4. Base legal</h3>
            <p>
              El tratamiento de datos se realiza bajo la <strong>Ley N.° 1682/2001</strong> de
              la República del Paraguay (Ley de Privacidad de Datos Personales) y
              su modificatoria la <strong>Ley N.° 1969/2002</strong>, que regulan la
              recolección, almacenamiento y uso de datos personales.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">5. Almacenamiento y seguridad</h3>
            <p>
              Los datos se transmiten de forma cifrada (HTTPS). Los pedidos
              enviados por correo electrónico quedan registrados en la bandeja de
              entrada del Titular. Tomamos medidas razonables para proteger la
              información contra acceso no autorizado, pérdida o alteración.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">6. Derechos del usuario</h3>
            <p>
              Conforme a la legislación paraguaya vigente, tenés derecho a:
            </p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>Acceder a tus datos personales en nuestro poder.</li>
              <li>Solicitar la rectificación de datos inexactos.</li>
              <li>Solicitar la eliminación de tus datos cuando ya no sean necesarios.</li>
              <li>Oponerte al tratamiento de tus datos para fines específicos.</li>
            </ul>
            <p>
              Para ejercer estos derechos, comunicate con nosotros a través del
              formulario de contacto.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">7. Cookies y tecnologías similares</h3>
            <p>
              Este sitio puede utilizar cookies técnicas necesarias para su
              funcionamiento. No utilizamos cookies de rastreo publicitario ni
              compartimos datos de navegación con terceros.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">8. Términos de uso</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>
                Los precios publicados están expresados en Guaraníes (₲) y son
                orientativos; pueden modificarse sin previo aviso.
              </li>
              <li>
                La disponibilidad de productos está sujeta al stock existente.
              </li>
              <li>
                Los costos de envío no están incluidos en los precios indicados y
                se coordinan por separado según la zona.
              </li>
              <li>
                El Titular se reserva el derecho de rechazar pedidos en casos de
                error de precio manifiesto o falta de stock.
              </li>
              <li>
                Las imágenes de los productos son ilustrativas; el color y acabado
                final puede variar levemente según el lote disponible.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">9. Modificaciones</h3>
            <p>
              El Titular se reserva el derecho de actualizar esta política en
              cualquier momento. La versión vigente estará siempre disponible en
              este mismo sitio con su fecha de última actualización.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">10. Jurisdicción</h3>
            <p>
              Cualquier controversia derivada del uso de este sitio o de la
              relación comercial entre las partes se someterá a la jurisdicción de
              los tribunales competentes de la República del Paraguay, con
              aplicación de su legislación vigente.
            </p>
          </section>
        </div>

        <div className="shrink-0 border-t border-neutral-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-neutral-950 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
