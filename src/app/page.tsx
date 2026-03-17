import animationData from "@/assets/animation.json";
import animationDataBoy from "@/assets/animation-two.json";
import LottieFlipSlider from "@/components/lottie-flip-slider";

export default function HomePage() {
  return (
    <main className="invite-shell">
      <section
        className="relative invite-card invite-card--center flex flex-col items-center justify-center"
        style={{ padding: "1rem" }}
      >
        <picture className="invite-image-container invite-image-container--absolute">
          <img className="img" src="/images/target-2.png" alt="" />
        </picture>

        <div className="div" style={{ zIndex: "10", padding: "10rem 0 0 0" }}>
          <div className="invite-home-lottie-container">
            <LottieFlipSlider
              frontData={animationData}
              backData={animationDataBoy}
              className="invite-home-lottie"
            />
          </div>

          <div className="invite-badge">Invitaciones</div>
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
