"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck2,
  CircleX,
  Heart,
  LoaderCircle,
  MapPinHouse,
  RefreshCcw,
  X,
} from "lucide-react";
import animationDataGirl from "@/assets/animation.json";
import dont from "@/assets/dont.json";
import yes from "@/assets/yes.json";
import animationDataBoy from "@/assets/animation-two.json";
import LottieAnimation from "../lottie-animation";

type GuestResponse = {
  nombre: string;
  detalle: string;
  asistencia: string;
};

type Decision = "asistir" | "no asistir";
type ViewState = "pending" | "asistir" | "no asistir";

type Props = {
  slug: string;
};

const cardVariants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.98 },
};

const modalVariants = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 12 },
};

export default function InvitationClient({ slug }: Props) {
  const [guest, setGuest] = useState<GuestResponse | null>(null);
  const [viewState, setViewState] = useState<ViewState>("pending");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<Decision | null>(null);
  const [error, setError] = useState("");
  const [showDecisionModal, setShowDecisionModal] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadGuest() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/guest?slug=${encodeURIComponent(slug)}`,
          {
            cache: "no-store",
          },
        );

        const data = (await response.json()) as GuestResponse & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error || "No fue posible cargar la invitacion.");
        }

        if (!active) {
          return;
        }

        setGuest(data);

        if (data.asistencia === "asistir") {
          setViewState("asistir");
          return;
        }

        if (data.asistencia === "no asistir") {
          setViewState("no asistir");
          return;
        }

        setViewState("pending");
      } catch (err) {
        if (!active) {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Ocurrio un error inesperado.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadGuest();

    return () => {
      active = false;
    };
  }, [slug]);

  const title = useMemo(() => {
    if (!guest) {
      return "Invitacion";
    }

    return guest.nombre;
  }, [guest]);

  async function submitDecision(decision: Decision) {
    try {
      setSubmitting(decision);
      setError("");

      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, decision }),
      });

      const data = (await response.json()) as GuestResponse & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.error || "No fue posible registrar la asistencia.",
        );
      }

      setGuest(data);
      setViewState(decision);
      setShowDecisionModal(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrio un error inesperado.",
      );
    } finally {
      setSubmitting(null);
    }
  }

  function openDecisionModal() {
    setShowDecisionModal(true);
  }

  function closeDecisionModal() {
    if (submitting !== null) {
      return;
    }

    setShowDecisionModal(false);
  }

  if (loading) {
    return (
      <main className="invite-shell">
        <motion.section
          className="invite-card invite-card--center flex justify-center items-center flex-col"
          initial="initial"
          animate="animate"
          variants={cardVariants}
          transition={{ duration: 0.35 }}
        >
          <LoaderCircle className="invite-spinner" />
          <p className="invite-muted">Cargando invitacion...</p>
        </motion.section>
      </main>
    );
  }

  if (error || !guest) {
    return (
      <main className="invite-shell ">
        <motion.section
          className="invite-card invite-card--center flex justify-center items-center flex-col"
          initial="initial"
          animate="animate"
          variants={cardVariants}
          transition={{ duration: 0.35 }}
        >
          <CircleX className="invite-icon invite-icon--danger" />
          <h1 className="invite-title">No pudimos cargar esta invitacion</h1>
          <p className="invite-muted">{error || "Invitado no encontrado."}</p>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="invite-shell">
      <AnimatePresence mode="wait">
        {viewState === "pending" ? (
          <motion.section
            key="pending"
            className="invite-card relative"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={cardVariants}
            transition={{ duration: 0.35 }}
          >
            <div className="overlay" />
            <div className="absolute invite-animation-container--girl">
              <LottieAnimation animationData={animationDataGirl} />
            </div>

            <picture className="invite-image-container invite-image-container--absolute">
              <video className="video" autoPlay loop muted playsInline>
                <source src="/videos/target.mp4" type="video/mp4" />
              </video>
            </picture>
            <div className="invite-container invite-container--pending">
              <div className="invite-confirmacion invite-confirmacion--reel">
                <div className="invite-reel-copy">
                  <h1 style={{ fontSize: "2rem" }} className="invite-title">
                    {title}
                  </h1>
                  <p style={{ margin: "0.3rem 0" }} className="invite-detail">
                    ¡Una dulce espera está por terminar! 🌸
                  </p>
                  <p className="invite-detail">
                    Celebremos juntos la llegada de nuestra hermosa Valeria.
                  </p>
                </div>

                <div className="invite-reel-event-grid">
                  <div className="invite-reel-date-column">
                    <h2 className="invite-title">20</h2>
                    <p className="invite-detail">Junio</p>
                  </div>

                  <div className="invite-reel-meta-column">
                    <p className="invite-detail">⏰ 5:00 p.m.</p>
                    <p className="invite-detail invite-reel-address">
                      📍 Transversal 74 D No 40 - H 14 sur
                    </p>
                    <p className="invite-detail invite-reel-address">
                      Salon Social Primer Piso
                    </p>
                    <a
                      href="https://maps.app.goo.gl/Bvs9bHeoJgU1uTNs7?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "0.875rem",
                        display: "inline-flex",
                        alignItems: "center",
                        color: "var(--muted)",
                      }}
                    >
                      <MapPinHouse className="invite-button-icon" />
                      Ver en Google Maps
                    </a>
                  </div>
                </div>

                {/* <div
                  className="invite-reel-footer"
                  style={{ margin: "0.5rem 0" }}
                >
                  <p className="invite-detail">
                    Regalo sugerido: <strong>{guest.detalle}</strong>
                  </p>
                  <p className="invite-detail">¿Deseas acompañar a Valeria?</p>
                </div> */}

                <div className="invite-actions invite-actions--pending">
                  <button
                    type="button"
                    className="invite-button invite-button--primary"
                    onClick={() => submitDecision("asistir")}
                    disabled={submitting !== null}
                  >
                    {submitting === "asistir" ? (
                      <LoaderCircle className="invite-button-icon invite-spin" />
                    ) : (
                      <Heart className="invite-button-icon" />
                    )}
                    Asistir
                  </button>

                  <button
                    type="button"
                    className="invite-button invite-button--secondary"
                    onClick={() => submitDecision("no asistir")}
                    disabled={submitting !== null}
                  >
                    {submitting === "no asistir" ? (
                      <LoaderCircle className="invite-button-icon invite-spin" />
                    ) : (
                      <CircleX className="invite-button-icon" />
                    )}
                    No asistir
                  </button>
                </div>

                {error ? <p className="invite-error">{error}</p> : null}
              </div>
            </div>
          </motion.section>
        ) : null}

        {viewState === "asistir" ? (
          <motion.section
            key="accepted"
            className="invite-card invite-card--center flex justify-center items-center flex-col gap"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={cardVariants}
            transition={{ duration: 0.35 }}
          >
            <div
              style={{
                width: "22rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LottieAnimation animationData={yes} />
            </div>

            <div className="invite-badge">Asistencia confirmada</div>
            <div className="flex flex-col items-center justify-center  ">
              <p className="invite-detail_dark">
                <strong>{guest.nombre}</strong> gracias por confirmar tu
                asistencia
              </p>
            </div>
            <div
              style={{ margin: "0.7rem 0" }}
              className="flex flex-col items-center justify-center  "
            >
              <p className="invite-detail_dark">
                Te esperamos el <strong>20 de junio a las 5:00 pm</strong>
              </p>
              <p className="invite-detail_dark">Te confirmo la direccion</p>
              <p className="invite-detail_dark">
                <strong>Transversal 74 D No 40 - H 14 sur</strong>
              </p>
              <p className="invite-detail_dark">Salon Social Primer Piso</p>

              <a
                href="https://maps.app.goo.gl/Bvs9bHeoJgU1uTNs7?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.875rem",
                  display: "inline-flex",
                  alignItems: "center",
                  color: "var(--text)",
                  fontWeight: "900",
                  marginTop: "1rem",
                }}
              >
                <MapPinHouse className="invite-button-icon" />
                Ver en Google Maps
              </a>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="invite-detail_dark">
                Valeria te agradecerá si le regalas:
              </p>
              <p
                className="invite-detail_dark"
                style={{ fontSize: "0.9rem", marginTop: "1rem" }}
              >
                <strong>{guest.detalle}</strong>
              </p>
            </div>

            <button
              type="button"
              style={{
                margin: "0",
                background: "var(--danger)",
                color: "var(--muted)",
                fontSize: "1rem",
                borderRadius: "999px",
                gap: "0.5rem",
                padding: "0.5rem 0.5rem",
              }}
              className="invite-button--ghost flex justify-center items-center"
              onClick={openDecisionModal}
            >
              <X className="invite-button-icon" />
              No podre asistir 😔
            </button>
          </motion.section>
        ) : null}

        {viewState === "no asistir" ? (
          <motion.section
            key="declined"
            className="invite-card invite-card--center flex justify-center items-center flex-col"
            initial="initial"
            style={{ gap: "1rem" }}
            animate="animate"
            exit="exit"
            variants={cardVariants}
            transition={{ duration: 0.35 }}
          >
            <LottieAnimation animationData={dont} />
            <div className="invite-badge">Respuesta registrada</div>
            <p className="invite-detail_dark">
              <strong>{guest.nombre}</strong> Lamentamos que no puedas asistir
            </p>

            <p className="invite-detail_dark">
              Cuando quieras vuelve al link que te envié y cambia tu decisión
              aquí:
            </p>
            <button
              type="button"
              style={{
                margin: "0",
                background: "var(--muted)",
                color: "var(--text)",
                fontSize: "1rem",
                borderRadius: "999px",
                gap: "0.5rem",
                padding: "0.5rem 0.5rem",
              }}
              className="invite-button--ghost flex justify-center items-center"
              onClick={openDecisionModal}
            >
              <RefreshCcw className="invite-button-icon" />
              Cambiar decision
            </button>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showDecisionModal ? (
          <motion.div
            className="invite-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              className="invite-modal"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={modalVariants}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                className="invite-modal-close"
                onClick={closeDecisionModal}
                disabled={submitting !== null}
                aria-label="Cerrar ventana"
              >
                <X size={18} />
              </button>

              <div className="invite-badge">Cambiar decision</div>
              <h2 className="invite-modal-title">
                Selecciona tu nueva respuesta
              </h2>
              <p
                style={{ marginBottom: "1rem", fontSize: "0.9rem" }}
                className="invite-detail_dark"
              >
                Tu eleccion se actualizara inmediatamente en nuestra lista de
                invitados.
              </p>

              <div className="invite-actions invite-actions--stack">
                <button
                  type="button"
                  style={{
                    margin: "0",
                    background: "var(--card)",
                    color: "var(--text)",
                    fontSize: "1rem",
                    borderRadius: "999px",
                    gap: "0.5rem",
                    padding: "0.5rem 0.5rem",
                  }}
                  className="invite-button--ghost flex justify-center items-center"
                  onClick={() => submitDecision("asistir")}
                  disabled={submitting !== null}
                >
                  {submitting === "asistir" ? (
                    <LoaderCircle className="invite-button-icon invite-spin" />
                  ) : (
                    <CalendarCheck2 className="invite-button-icon" />
                  )}
                  Asistir
                </button>

                <button
                  type="button"
                  style={{
                    margin: "0",
                    background: "var(--danger)",
                    color: "var(--muted)",
                    fontSize: "1rem",
                    borderRadius: "999px",
                    gap: "0.5rem",
                    padding: "0.5rem 0.5rem",
                  }}
                  className="invite-button--ghost flex justify-center items-center"
                  onClick={() => submitDecision("no asistir")}
                  disabled={submitting !== null}
                >
                  {submitting === "no asistir" ? (
                    <LoaderCircle className="invite-button-icon invite-spin" />
                  ) : (
                    <CircleX className="invite-button-icon" />
                  )}
                  No asistir
                </button>
              </div>

              {error ? <p className="invite-error">{error}</p> : null}
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
