import React from "react";
import { TextInputTypes } from "../types";

export default function TextInput({
  name,
  string,
  inputType,
  placeholder,
  error,
  onUpdate,
}: TextInputTypes) {
  return (
    <>
      <input
        name={name}
        type={inputType}
        value={string || ""}
        onChange={(e) => onUpdate(e.target.value)}
        autoComplete="off"
        placeholder={placeholder}
        className=" block w-full text-gray-800 border border-gray-300 bg-[#f1f1f2]  px-3 py-2.5 focus:outline-none "
      />

      <div className="font-semibold text-red-500 text-[14px] mt-1 ">
         { error ? ( error ) : null }
      </div>

    </>
  );
}
