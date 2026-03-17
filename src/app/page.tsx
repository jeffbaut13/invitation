import animationData from "@/assets/animation.json";
import animationDataBoy from "@/assets/animation-two.json";
import LottieFlipSlider from "@/components/lottie-flip-slider";

export default function HomePage() {
  return (
    <main className="invite-shell">
      <section className="invite-card invite-card--center">
        <div className="invite-home-lottie-container">
          <LottieFlipSlider
            frontData={animationData}
            backData={animationDataBoy}
            className="invite-home-lottie"
          />
        </div>
        <div className="invite-badge">Invitaciones</div>
        <h1 className="invite-title">Abre tu enlace personalizado</h1>
        <p className="invite-detail">
          Usa la URL de tu invitacion para confirmar asistencia al evento.
        </p>
      </section>
    </main>
  );
}
