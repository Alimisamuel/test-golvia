import React from "react";
interface TextInputProps {
  type: string;
  id: string;
  placeholder: string;
  label: string;
  className: string;
  span?: string | "";
}

export type Ref = HTMLInputElement;

export const TextInput = React.forwardRef<Ref, TextInputProps>((props, ref) => {
  return (
    <div className="flex flex-col text-[#3E3E3E] w-full">
      <label className="text-base">
        {props.label} <span className="text-[#AAB1C0]">{props.span}</span>
      </label>
      <input ref={ref} {...props} />
    </div>
  );
});

TextInput.displayName = "TextInput";
