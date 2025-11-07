import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SphereImageGrid, {
  type ImageData
} from "@/components/ui/SphereImageGrid";

const STAKEHOLDER_IMAGES: ImageData[] = [
  {
    id: "mod-ukraine",
    src: "/mod_ukraine.avif",
    alt: "Ministry of Defense of Ukraine",
    title: "Ministry of Defense of Ukraine",
    description:
      "Leads strategic planning, procurement, and coordination of Ukraine's national defence capabilities, ensuring armed forces readiness across all domains."
  },
  {
    id: "mia-ukraine",
    src: "/mia_ukraine.avif",
    alt: "Ministry of Internal Affairs of Ukraine",
    title: "Ministry of Internal Affairs",
    description:
      "Oversees internal security, national police operations, and emergency response networks that protect civilians and critical infrastructure."
  },
  {
    id: "msi-ukraine",
    src: "/msi_ukraine.avif",
    alt: "Ministry of Strategic Industries of Ukraine",
    title: "Ministry of Strategic Industries",
    description:
      "Drives innovation and industrial partnerships that supply advanced defence technologies and manufacturing capacity."
  },
  {
    id: "general-staff",
    src: "/general_staff.avif",
    alt: "General Staff of the Armed Forces of Ukraine",
    title: "General Staff of the Armed Forces",
    description:
      "Coordinates joint operations, intelligence, and strategic command for Ukraine’s unified military effort."
  },
  {
    id: "land-forces",
    src: "/land_forces.avif",
    alt: "Land Forces Command",
    title: "Land Forces Command",
    description:
      "Manages ground operations, equipment sustainment, and frontline readiness for land-based defence formations."
  },
  {
    id: "air-forces",
    src: "/air_forces.avif",
    alt: "Air Forces Command",
    title: "Air Forces Command",
    description:
      "Provides air superiority, integrated air defence, and rapid response aviation support across the theatre."
  },
  {
    id: "naval-forces",
    src: "/naval_forces.avif",
    alt: "Naval Forces Command",
    title: "Naval Forces Command",
    description:
      "Secures maritime approaches, coastal infrastructure, and strategic waterways with modern naval assets."
  },
  {
    id: "uav-forces",
    src: "/uav_forces.avif",
    alt: "UAV Forces Command",
    title: "UAV Forces Command",
    description:
      "Integrates unmanned aerial systems for reconnaissance, strike support, and rapid intelligence-sharing."
  },
  {
    id: "special-forces",
    src: "/special_forces.avif",
    alt: "Special Operation Forces",
    title: "Special Operation Forces",
    description:
      "Conducts precision missions, counter-terrorism, and high-impact operations in multi-domain environments."
  },
  {
    id: "national-guard",
    src: "/national_guard.avif",
    alt: "National Guard of Ukraine",
    title: "National Guard of Ukraine",
    description:
      "Supports territorial defence, public security, and humanitarian response alongside the armed forces."
  },
  {
    id: "omega-defense",
    src: "/omega Background Removed.png",
    alt: "Omega Defense Systems",
    title: "Omega Defense Systems",
    imageStyles: {
      filter: "brightness(0) invert(1)"
    },
    description:
      "Delivers mission-ready solutions and specialized support capabilities to reinforce allied defence programmes."
  }
];

const CLONE_MULTIPLIER = 3;

const SPHERE_IMAGES: ImageData[] = Array.from({ length: CLONE_MULTIPLIER }, (_, cloneIndex) =>
  STAKEHOLDER_IMAGES.map(image => ({
    ...image,
    id: `${image.id}-clone-${cloneIndex}`
  }))
).flat();

export default function StrategicStakeholdersSection() {
  const [containerSize, setContainerSize] = useState(420);

  useEffect(() => {
    const computeSize = () => {
      const width = window.innerWidth || 1280;
      const horizontalPadding = width < 768 ? 48 : 160;
      const maxPossible = width - horizontalPadding;
      const clamped = Math.max(300, Math.min(maxPossible, width < 768 ? 410 : 600));
      setContainerSize(Math.round(clamped * 0.85));
    };

    computeSize();
    window.addEventListener("resize", computeSize);

    return () => {
      window.removeEventListener("resize", computeSize);
    };
  }, []);

  return (
    <section
      className="relative w-full bg-scout-dark"
      style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem' }}
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal variant="slide-up">
            <div className="mb-16 text-center">
              <h2 className="font-teko text-4xl font-bold uppercase text-scout-text-white md:text-5xl">
                Strategic Defence Stakeholders
              </h2>
            </div>
          </Reveal>

          <Reveal variant="fade" delayMs={120}>
            <div className="mx-auto flex w-full max-w-[680px] items-center justify-center">
              <div className="relative flex items-center justify-center">
                <SphereImageGrid
                  className="relative z-10 mx-auto"
                  images={SPHERE_IMAGES}
                  containerSize={containerSize}
                  sphereRadius={containerSize * 0.46}
                  dragSensitivity={0.52}
                  baseImageScale={0.23}
                  hoverScale={1.04}
                  autoRotate
                  autoRotateSpeed={0.2}
                  centerOverlay={
                    <img
                      src="/TT logo.png"
                      alt="Triada Trade"
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  }
                  centerOverlayClassName="flex h-[30%] w-[30%] items-center justify-center"
                  centerOverlayZIndex={1000}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
