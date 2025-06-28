import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { stringUtil } from "utils";

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

export default ButtonShowBracket;
