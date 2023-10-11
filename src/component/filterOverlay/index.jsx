import { useState } from "react";
import "./styles.css";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  Radio,
  RadioGroup,
  Sheet,
} from "@mui/joy";
import { Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

const FilterOverlay = ({ onValidate }) => {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleValidate = () => {
    onValidate(filter);
    setOpen(false);
  };

  const handleDeleteFilter = () => {
    setFilter("");
    onValidate("");
    setOpen(false);
  };
  return (
    <div className="modelOverlay">
      <Button
        endDecorator={<TuneIcon />}
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        Filtre
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 200,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Filtre
          </Typography>
          <FormControl>
            <FormLabel>Sources d'informations</FormLabel>
            <RadioGroup
              value={filter}
              onChange={handleChange}
              name="radio-buttons-group"
            >
              <Radio value="Par vos amis" label="Par vos amis" />
              <Radio value="Par les streamers" label="Par les streamers" />
              <Radio
                value="Par les publications"
                label="Par les publications"
              />
            </RadioGroup>
          </FormControl>
          <div className="groupButton">
            <Button variant="solid" onClick={handleValidate} sx={{ margin: 1 }}>
              Valider
            </Button>
            <Button
              variant="solid"
              onClick={handleDeleteFilter}
              sx={{ margin: 1 }}
            >
              Supprimer filtre
            </Button>
          </div>
        </Sheet>
      </Modal>
    </div>
  );
};

export default FilterOverlay;
