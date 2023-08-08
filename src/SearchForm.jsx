import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { InputElement } from "./components/InputElement";
import IconElement from "./components/IconElement";
import { geocodeAddress } from "./geocodeAddress";

function Form({ onAddressSubmit, setAddresses }) {
  const addresses = [
    { lat: 48.86994, lng: 2.33461, label: "29 Rue du 4 Septembre" },
    { lat: 48.85909, lng: 2.31792, label: "15 Rue de Bourgogne" },
  ];
  const [formState, setFormState] = useState({
    pickup: {
      address: "",
      isValid: false,
      markerColor: "blank",
    },
    dropoff: {
      address: "",
      isValid: false,
      markerColor: "blank",
    },
    isButtonEnabled: false,
  });

  useEffect(() => {
    const isButtonEnabled = formState.pickup.isValid && formState.dropoff.isValid;
    setFormState((prevState) => ({
      ...prevState,
      isButtonEnabled,
    }));
  }, [formState.pickup.isValid, formState.dropoff.isValid]);

  const handleAddressBlur = async (field) => {
    const { address } = formState[field];

    if (address.trim() === "") {
      return;
    }

    try {
      const geocodedAddress = await geocodeAddress(address);

      console.log(geocodedAddress);

      const existingAddress = addresses.find(
        (existingAddress) =>
          existingAddress.lat === geocodedAddress.lat &&
          existingAddress.lng === geocodedAddress.lng
      );

      const isValid = !!existingAddress;

      console.log(isValid);

      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          isValid,
          markerColor: isValid
            ? field === "pickup"
              ? "orange"
              : "green"
            : "red",
        },
      }));

      if (isValid) {
        setAddresses((prevAddresses) => [
          ...prevAddresses,
          {
            label: address,
            lat: geocodedAddress.lat,
            lng: geocodedAddress.lng,
          },
        ]);
      }
    } catch (error) {
      console.log("Error geocoding address:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onAddressSubmit(addresses);
  };
  const handleAddressChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        address: value,
      },
    }));
  };

  return (
    <form className={styles.formContainer} onSubmit={handleFormSubmit}>
      <div className={styles.inputContainer}>
        <IconElement badge={"pickup"} color={formState.pickup.markerColor} />
        <InputElement
          address={formState.pickup.address}
          setAddress={(value) => handleAddressChange("pickup", value)}
          onInputBlur={() => handleAddressBlur("pickup")}
          placeholder={"Pick up address"}
        />
      </div>
      <div className={styles.inputContainer}>
        <IconElement badge={"dropoff"} color={formState.dropoff.markerColor} />
        <InputElement
          address={formState.dropoff.address}
          setAddress={(value) => handleAddressChange("dropoff", value)}
          onInputBlur={() => handleAddressBlur("dropoff")}
          placeholder={"Drop off address"}
        />
      </div>
      <button
        type="submit"
        disabled={!formState.isButtonEnabled}
        className={styles.submitButton}
      >
        Create job
      </button>
    </form>
  );
}

export default Form;

