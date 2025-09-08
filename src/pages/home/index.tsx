import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { useCardStore } from '@/store/cardStore';
import { useNavigate } from '@tanstack/react-router';

import { CardControlPanel, TemplateKey } from '@/components/CardControlPanel';
import { CardPreview } from '@/components/CardPreview';

const Home = () => {
  const [fullName, setFullName] = useState('');
  const [handle, setHandle] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplateKey>('bg1');
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [twitterFields, setTwitterFields] = useState({
    fullName: false,
    handle: false,
    avatar: false,
  });
  const { setState } = useCardStore();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Prefill form with user data after login
  useEffect(() => {
    if (isAuthenticated && user) {
      setFullName(user.name || '');
      setHandle(user.username || '');
      setAvatar(user.profileImageUrl || null);
      setIsPrefilled(true);

      // Track which fields are from Twitter
      setTwitterFields({
        fullName: !!user.name,
        handle: !!user.username,
        avatar: !!user.profileImageUrl,
      });

      // Hide the notification after 3 seconds
      setTimeout(() => setIsPrefilled(false), 3000);
    }
  }, [isAuthenticated, user]);

  // Handlers to clear Twitter indicators when manually edited
  const handleFullNameChange = (value: string) => {
    setFullName(value);
    if (twitterFields.fullName) {
      setTwitterFields((prev) => ({ ...prev, fullName: false }));
    }
  };

  const handleHandleChange = (value: string) => {
    setHandle(value);
    if (twitterFields.handle) {
      setTwitterFields((prev) => ({ ...prev, handle: false }));
    }
  };

  const handleAvatarChange = (value: string | null) => {
    setAvatar(value);
    if (twitterFields.avatar) {
      setTwitterFields((prev) => ({ ...prev, avatar: false }));
    }
  };

  const handleGenerate = () => {
    setState({
      image: avatar || '',
      name: fullName,
      username: handle,
      template: template,
    });
    navigate({ to: '/preview' });
  };

  return (
    <div>
      {/* Prefill notification */}
      {isPrefilled && (
        <div className="fixed right-4 top-4 z-50 rounded-lg bg-green-500 px-4 py-2 text-sm text-white shadow-lg transition-opacity duration-300">
          ✓ Form prefilled with your Twitter data
        </div>
      )}

      <div className="flex min-h-0 items-center">
        <div className="h-full w-full items-center px-6 py-12 text-white">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col gap-10 md:flex-row lg:flex-row">
              {/* Preview */}
              <div className="flex w-full items-start justify-center lg:max-w-[532px] lg:justify-start">
                <CardPreview
                  name={fullName}
                  username={handle}
                  template={template}
                  avatarUrl={avatar}
                  textSize="8xl"
                  textClassName="text-5xl"
                  imageClassName="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]"
                  className="h-full min-h-[493px] w-full min-w-[335px] rounded-[32px] border-[16px] border-[#1f1f1f] text-white shadow-[0_0_20px_rgba(255,255,255,0.08)] lg:rounded-[64px]"
                />
              </div>
              {/* Control Panel */}
              <CardControlPanel
                fullName={fullName}
                handle={handle}
                avatar={avatar}
                template={template}
                onFullNameChange={handleFullNameChange}
                onHandleChange={handleHandleChange}
                onAvatarChange={handleAvatarChange}
                onTemplateChange={setTemplate}
                onGenerate={handleGenerate}
              />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
