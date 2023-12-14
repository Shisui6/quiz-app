// Import necessary dependencies
import { Player } from '@lottiefiles/react-lottie-player';

/**
 * The Loader component displays a loading animation and a message.
 *
 * @component
 */
const Loader = () => (
  <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-white flex justify-center items-center flex-col">
    <Player
      src="https://lottie.host/50cb07e0-e8ac-4f3e-9618-e0023b1301ea/tcS7iI5m81.json"
      className="h-64 w-64"
      autoplay
      loop
      speed={1}
    />
    <h1 className="text-[#936e8f] font-bold text-center text-xl mt-5">Fetching your questions. . .</h1>
  </div>
);

/**
 * The CalculateLoader component displays a calculating animation and a message.
 *
 * @component
 */
const CalculateLoader = () => (
  <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-white flex justify-center items-center flex-col">
    <Player
      src="https://lottie.host/57a47a23-dedb-4ef8-b1a8-1c5f34e1ac98/NNmafRe2cT.json"
      className="h-64 w-64"
      autoplay
      loop
      speed={1}
    />
    <h1 className="text-[#936e8f] font-bold text-center text-xl">Lets see how you did</h1>
  </div>
);

export { Loader, CalculateLoader };
