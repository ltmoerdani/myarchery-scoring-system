import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { stringUtil } from "utils";
import PropTypes from "prop-types";



function ButtonShowBracket({ categoryDetailId, eventId }) {
  const history = useHistory();

  const handleClickBracket = () => {
    const url = stringUtil.createUrlParamFromObj({
      categoryId: categoryDetailId,
    });
    history.push(`/dashboard/events/${eventId}/elimination/bracket${url}`);
  };

  return (
    <Button color="info" size="sm" onClick={handleClickBracket}>
      Lihat Bagan
    </Button>
  );
}

ButtonShowBracket.propTypes = {
  categoryDetailId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
};

export default ButtonShowBracket;
