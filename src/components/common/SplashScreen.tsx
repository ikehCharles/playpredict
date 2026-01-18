import Image from "next/image";
import Loader from "./Loader";

interface SplashScreenProps {
  isVisible: boolean;
}

export default function SplashScreen({ isVisible }: SplashScreenProps) {
  return (
    <div
      className={`fixed inset-0 flex min-h-screen bg-primary items-center justify-center font-sans z-100 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        {/* PlayPredict Logo */}
        <Image
          src="/icons/PlayPredictLogoWhite.svg"
          alt="PlayPredict Logo"
          width={280}
          height={80}
          priority
          className="animate-fade-in"
        />

        {/* Loading Spinner */}
        <Loader />
      </div>
    </div>
  );
}
