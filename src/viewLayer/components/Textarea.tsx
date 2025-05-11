interface TextareaProps {
  placeholder: string;
  text: string;
  ref: React.RefObject<HTMLTextAreaElement | null>;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  text,
  ref,
  onChange,
}) => {
  return (
    <textarea
      value={text}
      ref={ref}
      onChange={onChange}
      placeholder={placeholder}
      className="min-h-[100px] w-full rounded-2xl border border-gray-300 px-4 py-2 focus:border-blue-300 focus:outline-none"
    />
  );
};
