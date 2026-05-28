import animationDataGirl from "@/assets/animation.json";
import LottieAnimation from "@/components/lottie-animation";

export default function HomePage() {
  return (
    <main className="invite-shell">
      <section
        className="relative invite-card invite-card--center flex flex-col items-center justify-center"
        style={{ padding: "1rem" }}
      >
        <div className="overlay" />
        <picture className="invite-image-container invite-image-container--absolute">
          <video className="video" autoPlay loop muted playsInline>
            <source src="/videos/target.mp4" type="video/mp4" />
          </video>
        </picture>
        <div className="flex flex-col items-center" style={{ zIndex: "10", padding: "10rem 0 0 0" }}>
          <div className="invite-home-lottie-container">
            <LottieAnimation animationData={animationDataGirl} />
          </div>
          <div className="invite-badge">Valeria te espera</div>

          <h1 className="invite-title" style={{ margin: "1rem 0" }}>
            Abre tu enlace personalizado
          </h1>
          <p className="invite-detail">ó</p>
          <p className="invite-detail">Pidele a Catehryn Bonnet</p>
          <p className="invite-detail">que cree tu invitacion al evento.</p>
          <p className="invite-title" style={{ margin: "1rem 0" }}>
            Escribe al 314 250 3897
          </p>
        </div>
      </section>
    </main>
  );
}
