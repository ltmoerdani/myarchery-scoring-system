import React from "react";
import SelectInput from "components/Form/SelectInput";

function SelectClassificationSetting({ value, onChange, options = [], isDisabled }) {
  const transformedOptions = options.map((option) => ({
    label: option.label,
    value: option.value,
    isDisabled: option.isDisabled || false,
  }));

  return (
    <SelectInput
      name="classification"
      value={value}
      onChange={onChange}
      options={transformedOptions}
      isDisabled={isDisabled}
      placeholder="Pilih klasifikasi"
    />
  );
}

export default SelectClassificationSetting;
