import React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { Input } from "reactstrap";

function CurrencyInput({ ...props }) {
  return (
    <NumericFormat
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix={"Rp. "}
      customInput={Input}
      {...props}
    />
  );
}

CurrencyInput.propTypes = {
  props: PropTypes.any,
};

export default CurrencyInput;
