import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardHeader } from "@material-ui/core";
import ItemTextFields from "./ItemTextFields/ItemTextFields";
import ItemAddImage from "./ItemAddImage/ItemAddImage";
import { addingItemStyles } from "../../../styles/styles";
import SelecDate from "./SelectDate/SelectDate";

function AddingItem(props) {
  const { classes } = props
  return(
    <Card className = { classes.Card }>
      <CardHeader title = "Дбавить в список покупок"/>
      <form className = { classes.Form }>
        <ItemTextFields/>
        <SelecDate/>
        <ItemAddImage/>
     </form>
    </Card>
  );
}

AddingItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(addingItemStyles)(AddingItem);