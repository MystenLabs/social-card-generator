import Marquee from '../Marquee';
import LandingCard from './LandingCard';

const sphereVideo = [
  [
    'https://cdn.prod.website-files.com/68867d11f8935a7a0bbab1b7%2F68873ed1ad2c5c0d13c82b92_0728-transcode.mp4',
    'https://cdn.prod.website-files.com/68867d11f8935a7a0bbab1b7%2F68873ed1ad2c5c0d13c82b92_0728-transcode.webm',
  ],
  [
    'https://cdn.prod.website-files.com/68867d11f8935a7a0bbab1b7%2F68873f285afdd9048966e964_0728%282%29-transcode.mp4',
    'https://cdn.prod.website-files.com/68867d11f8935a7a0bbab1b7%2F68873f285afdd9048966e964_0728%282%29-transcode.webm',
  ],
  [
    'https://cdn.prod.website-files.com/68867d11f8935a7a0bbab1b7%2F68873ed1ad2c5c0d13c82b92_0728-transcode.mp4',
    'https://cdn.prod.website-files.com/68867d11f8935a7a0bbab1b7%2F68873ed1ad2c5c0d13c82b92_0728-transcode.webm',
  ],
  [
    'https://cdn.prod.website-files.com/68867d11f8935a7a0bbab1b7%2F68873f2cb18ab1756ce67435_0728%281%29-transcode.mp4',
    'https://cdn.prod.website-files.com/68867d11f8935a7a0bbab1b7%2F68873f2cb18ab1756ce67435_0728%281%29-transcode.webm',
  ],
];

const LandingBackground = () => {
  return (
    <div className="relative w-full py-8">
      <Marquee speed={30} className="mx-auto flex h-full max-w-[2930px] items-center overflow-hidden">
        <div className="pointer-events-none flex items-center gap-2 py-2 pr-8">
          {[...sphereVideo, ...sphereVideo].map((x, index) => (
            <div key={index} className="aspect-square h-[180px] shrink-0 overflow-hidden rounded-full md:h-[380px]">
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src={x[0]} />
                <source src={x[1]} />
              </video>
            </div>
          ))}
        </div>
      </Marquee>

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <LandingCard className="scale-50 md:scale-100" />
      </div>
    </div>
  );
};

export default LandingBackground;
