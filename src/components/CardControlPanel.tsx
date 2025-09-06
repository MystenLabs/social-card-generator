'use client';

import React from 'react';

import { Input } from './Input';

export type TemplateKey = 'bg1' | 'bg2' | 'bg3';

const templates: { key: TemplateKey; image: string }[] = [
  { key: 'bg1', image: '/teamplate/template1.png' },
  { key: 'bg2', image: '/teamplate/template2.png' },
  { key: 'bg3', image: '/teamplate/template3.png' },
];

interface CardControlPanelProps {
  fullName: string;
  handle: string;
  avatar: string | null;
  template: TemplateKey;
  onFullNameChange: (value: string) => void;
  onHandleChange: (value: string) => void;
  onAvatarChange: (dataUrl: string | null) => void;
  onTemplateChange: (tpl: TemplateKey) => void;
  onGenerate: () => void;
}

export function CardControlPanel(props: CardControlPanelProps) {
  const {
    fullName,
    handle,
    avatar,
    template,
    onFullNameChange,
    onHandleChange,
    onAvatarChange,
    onTemplateChange,
    onGenerate,
  } = props;

  // const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onAvatarChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full w-full rounded-[32px] border border-white/10 bg-[#4B4B4B33] p-8 lg:rounded-[64px]">
      <h2 className="text-2xl font-medium leading-tight lg:text-[40px]">Create your own #SuiFest Card</h2>

      <div className="mt-12">
        <div>
          <p className="mb-8 text-base font-medium text-white lg:text-xl">Display information</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="lg:space-y-2">
              <Input
                id="full-name"
                label="Full Name"
                placeholder="eg: Jerome Krel"
                required
                value={fullName}
                onChange={(e) => onFullNameChange(e.target.value)}
              />
            </div>
            <div className="lg:space-y-2">
              <Input
                id="handle"
                label="X handle"
                placeholder="eg: hagen.web3"
                required
                value={handle}
                onChange={(e) => onHandleChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div className="flex items-center gap-3">
            <Input
              id="profile-picture"
              label="Profile Picture"
              placeholder={
                avatar
                  ? 'Upload profile picture'
                  : avatar?.startsWith('http')
                    ? 'Twitter profile loaded'
                    : 'Custom image uploaded'
              }
              type="file"
              onChange={(e) => {
                onFileChange(e);
                e.target.value = '';
              }}
            />
          </div>

          <div className="cursor-pointer text-sm text-[#226DCF]" onClick={() => onAvatarChange(null)}>
            <p className="px-4 pt-2">Remove uploaded photo</p>
          </div>
        </div>

        <div className="pt-12">
          <p className="text-base font-medium text-white lg:text-2xl">Card templates</p>
          <div className="flex space-x-6 pt-8">
            {templates.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => onTemplateChange(t.key)}
                className={
                  'relative h-20 w-20 overflow-hidden rounded-lg border shadow-inner transition lg:h-[124px] lg:w-[124px] lg:rounded-2xl ' +
                  (template === t.key ? 'ring-1 ring-white' : 'border-white/10 hover:border-white/30')
                }
                aria-label={`Template ${t.key}`}
              >
                <img src={t.image} alt={`Template ${t.key}`} className="h-full w-full rounded-2xl object-cover" />
                {template === t.key && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-12">
          <button
            onClick={onGenerate}
            className="h-12 w-full rounded-2xl bg-white px-6 text-xl text-black md:w-auto lg:text-xl"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
