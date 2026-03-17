"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck2,
  CircleX,
  LoaderCircle,
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
            <div className="absolute invite-animation-container--girl">
              <LottieAnimation animationData={animationDataGirl} />
            </div>
            <div className="absolute invite-animation-container--boy">
              <LottieAnimation animationData={animationDataBoy} />
            </div>
            <picture className="invite-image-container invite-image-container--absolute">
              <img className="img" src="/images/target.png" alt="" />
            </picture>
            <div className="invite-container">
              <div>
                <div className="invite-space" />
                <h1 className="invite-title">{title}</h1>
              </div>

              <div className="invite-confirmacion flex justify-center items-center flex-col justify-between">
                <p className="invite-detail">
                  El baby te agradecera si le regalas:
                </p>
                <p className="invite-detail invite-detail--bold">
                  {guest.detalle}
                </p>
                <div className="invite-badge">¿Nos acompañas?</div>
                <div className="invite-actions">
                  <button
                    type="button"
                    className="invite-button invite-button--primary"
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
            className="invite-card invite-card--center flex justify-center items-center flex-col"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={cardVariants}
            transition={{ duration: 0.35 }}
          >
            <LottieAnimation animationData={yes} />
            <div className="invite-badge">Asistencia confirmada</div>
            <h1 className="invite-detail">
              Gracias por confirmar tu asistencia
            </h1>
            <p className="invite-title">{guest.nombre}</p>
            <button
              type="button"
              className="invite-button invite-button--ghost"
              onClick={openDecisionModal}
            >
              <RefreshCcw className="invite-button-icon" />
              Cambiar decision
            </button>
          </motion.section>
        ) : null}

        {viewState === "no asistir" ? (
          <motion.section
            key="declined"
            className="invite-card invite-card--center flex justify-center items-center flex-col"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={cardVariants}
            transition={{ duration: 0.35 }}
          >
            <LottieAnimation animationData={dont} />
            <div className="invite-badge">Respuesta registrada</div>
            <h1 className="invite-detail">Lamentamos que no puedas asistir</h1>
            <p className="invite-title">{guest.nombre}</p>
            <button
              type="button"
              className="invite-button invite-button--ghost"
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
              <p className="invite-muted">
                Tu eleccion se actualizara inmediatamente en la lista de
                invitados.
              </p>

              <div className="invite-actions invite-actions--stack">
                <button
                  type="button"
                  className="invite-button invite-button--primary"
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
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
