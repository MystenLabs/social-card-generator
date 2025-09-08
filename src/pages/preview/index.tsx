'use client';

import { useRef, useState } from 'react';
import { getShareLink } from '@/api/auth/getShareLink';
import html2canvas from 'html2canvas';

import AvailableCard from '@/components/AvailableCard';
import Button from '@/components/button';
import { CardPreview } from '@/components/CardPreview';

import { useCardStore } from '../../store/cardStore';

const PreviewPage = () => {
  const { state } = useCardStore();
  const captureRef = useRef<HTMLDivElement>(null);
  const hiddenCaptureRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  //download image
  const handleDownload = async () => {
    const file = await handleCapture();
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'suifest-card.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleCapture = async () => {
    if (hiddenCaptureRef.current) {
      const canvas = await html2canvas(hiddenCaptureRef.current, {
        scale: 2,
        width: 850,
        height: 480,
        useCORS: true,
        backgroundColor: '#000000',
      });
      const dataUrl = canvas.toDataURL('image/png');
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'suifest-card.png', { type: 'image/png' });

      return file;
    }

    return null;
  };

  const handleShareOnX = async () => {
    setIsSharing(true);
    try {
      const file = await handleCapture();
      if (!file) {
        throw new Error('Failed to capture image');
      }

      const response = await getShareLink(file);
      const { shareUrl } = response;

      // Open Twitter share intent with the server's share URL
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterShareUrl, '_blank', 'width=600,height=400');
    } catch (error) {
      console.error('Error sharing on X:', error);
      alert('Failed to share on X. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-199px)] flex-col items-center justify-center">
      <div
        ref={hiddenCaptureRef}
        className="pointer-events-none absolute left-[-9999px] top-[-9999px]"
        style={{
          width: 850,
          height: 480,
        }}
      >
        <div className="flex w-full justify-center">
          <div className="flex min-h-[480px] w-full overflow-hidden" ref={captureRef}>
            <CardPreview
              name={state.name}
              username={state.username.startsWith('@') ? state.username.slice(1) : state.username}
              avatarUrl={state.image}
              template={state.template}
              responsive={false}
            />
            <AvailableCard responsive={false} />
          </div>
        </div>
      </div>

      {/* Visible responsive preview */}
      <div className="mx-auto w-full min-w-[320px] max-w-[850px] bg-black px-4 lg:px-0">
        <div className="flex w-full justify-center">
          <div className="flex min-h-[190px] w-full overflow-hidden md:min-h-[415px] lg:min-h-[480px]" ref={captureRef}>
            <CardPreview
              name={state.name}
              username={state.username.startsWith('@') ? state.username.slice(1) : state.username}
              avatarUrl={state.image}
              template={state.template}
              textSize="7xl"
              imageSize="120px"
              textClassName="text-2xl lg:text-7xl md:text-5xl"
              imageClassName="h-[120px] w-[120px] sm:h-[200px] sm:w-[200px]  md:h-[250px] md:w-[250px]"
            />
            <AvailableCard />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 pt-8 text-center text-xl font-medium md:px-8 md:pt-8 lg:px-0 lg:pt-16 lg:text-4xl">
        <h2>Share your newly generated SuiFest Card</h2>
      </div>
      <div className="flex w-full flex-col gap-8 px-5 py-6 lg:flex lg:flex-row lg:items-center lg:justify-center lg:px-0 lg:py-12">
        <Button
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          }
          onClick={handleShareOnX}
          loading={isSharing}
        >
          Share on
        </Button>

        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
};
export default PreviewPage;
