interface FormGroupProps {
  id: string;
  title: string;
  inputType: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function FormGroup({
  id,
  title,
  inputType,
  value,
  onChange,
}: FormGroupProps) {
  return (
    <div className="flex flex-col">
      <label className="tracking-wider " htmlFor={id}>
        {title}
      </label>
      <input
        autoComplete="off"
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        className="bg-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
