const inputBase =
  "w-full rounded-xl border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

export function TextInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  leftIcon,
  rightSlot,
  ...rest
}) {
  return (
    <div className="relative">
      {leftIcon && (
        <span
          className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${
            error ? "text-red-400" : "text-slate-400"
          }`}
        >
          {leftIcon}
        </span>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`${inputBase} ${error ? "border-red-300" : "border-slate-200"}`}
        {...rest}
      />
      {rightSlot && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
      )}
    </div>
  );
}
