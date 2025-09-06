interface InputProps {
  label: string;
  placeholder: string;
  required?: boolean;
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, placeholder, required, id, name, type, value, onChange }: InputProps) {
  const inputId = id || name || label.toLowerCase().replace(/\s+/g, '-');
  const isFileInput = type === 'file';

  if (isFileInput) {
    return (
      <div className="relative h-[42px] w-full lg:h-[60px]">
        <input
          type="file"
          id={inputId}
          name={name}
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
        />
        <div className="flex h-full w-full items-center justify-between rounded-full border-2 border-white/5 bg-transparent px-2 py-2 lg:px-4">
          <span className="w-[174px] pt-1 text-xs text-[#484848] lg:w-[214px] lg:text-base">
            {value ? 'profilepicture.jpg' : placeholder}
          </span>
          <div> </div>
          <button
            type="button"
            className="h-full w-[89px] rounded-full bg-white/20 text-xs text-[#9c9c9c] transition-colors hover:bg-white/30 lg:w-[134px] lg:text-base"
          >
            Select Photo
          </button>
        </div>
        <label htmlFor={inputId} className="absolute -top-2 left-6 bg-[#0F0F0F] px-2 text-sm text-[#868686]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type={type || 'text'}
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-[42px] w-full rounded-[64px] border-2 border-white/5 bg-transparent px-4 py-3 text-white placeholder:text-xs placeholder:text-[#484848] focus:border-white/5 focus:outline-none lg:h-[60px] lg:placeholder:text-base"
      />
      <label htmlFor={inputId} className="absolute -top-2 left-3 bg-[#0F0F0F] px-2 text-sm font-medium text-[#868686]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}
