import React from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "reactstrap";
import { Controller } from "react-hook-form";

function FieldInputPrice({
  name,
  control,
  errors,
  disabled,
  placeholder = "Masukkan nominal",
  label,
}) {
  const controlId = `field-input-price-${name}`;
  return (
    <div>
      {label && <label htmlFor={controlId}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NumericFormat
            {...field}
            id={controlId}
            displayType={"input"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"Rp "}
            customInput={Input}
            onValueChange={(values) => {
              field.onChange(values.floatValue);
            }}
            value={field.value || ""}
            className="form-control"
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && <span className="text-danger">{errors[name].message}</span>}
    </div>
  );
}

export default FieldInputPrice;
