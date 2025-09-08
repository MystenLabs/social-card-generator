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
      <div className="relative w-full">
        <input
          type="file"
          id={inputId}
          name={name}
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <div className="flex h-[60px] w-full items-center justify-between rounded-full border-2 border-white/20 bg-transparent px-6 py-4">
          <span className="text-base text-white">{value ? 'profilepicture.jpg' : placeholder}</span>
          <button
            type="button"
            className="rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30"
          >
            Change
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
        className="h-[60px] w-[198px] rounded-2xl border-2 border-white/5 bg-transparent px-4 py-3 text-white placeholder:text-gray-500 focus:border-white/5 focus:outline-none"
      />
      <label htmlFor={inputId} className="absolute -top-2 left-3 bg-[#0F0F0F] px-2 text-sm font-medium text-[#868686]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}
