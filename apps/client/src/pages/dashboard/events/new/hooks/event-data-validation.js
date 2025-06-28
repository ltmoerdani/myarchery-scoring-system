import React from "react";

function useEventDataValidation(eventData) {
  const [validation, setValidation] = React.useState({ errors: {} });
  const { errors: validationErrors } = validation;
  const isValid = !Object.keys(validationErrors)?.length;

  const ValidationErrors = ValidationErrorsByStep(validationErrors);

  const validate = ({ step, onValid, onInvalid }) => {
    const Step1 = StepGroupValidation();
    const Step2 = StepGroupValidation();

    // STEP 1: Informasi Umum
    Step1.validate("eventName", () => {
      if (!eventData.eventName) {
        return "Wajib diisi";
      }
    });

    Step1.validate("location", () => {
      if (!eventData.location) {
        return "Wajib diisi";
      }
    });

    Step1.validate("locationType", () => {
      if (!eventData.locationType) {
        return "Wajib diisi";
      }
    });

    Step1.validate("city", () => {
      if (!eventData.city?.value) {
        return "Wajib diisi";
      }
    });

    Step1.validate("registrationDateStart", () => {
      if (!eventData.registrationDateStart) {
        return "Wajib diisi";
      }
    });

    Step1.validate("registrationDateEnd", () => {
      if (!eventData.registrationDateEnd) {
        return "Wajib diisi";
      }

      if (eventData.registrationDateEnd <= eventData.registrationDateStart) {
        return "Tanggal dan jam tutup pendaftaran harus setelah waktu mulai pendaftaran";
      }
    });

    Step1.validate("eventDateStart", () => {
      if (!eventData.eventDateStart) {
        return "Wajib diisi";
      }
    });

    Step1.validate("eventDateEnd", () => {
      if (!eventData.eventDateEnd) {
        return "Wajib diisi";
      }

      if (eventData.eventDateEnd <= eventData.eventDateStart) {
        return "Tanggal dan jam akhir lomba harus setelah waktu mulai lomba";
      }
    });

    // STEP 2: Kategori
    for (const categoryGroup of eventData.eventCategories) {
      Step2.validate(`${categoryGroup.key}-competitionCategory`, () => {
        if (!categoryGroup.competitionCategory?.value) {
          return "Wajib diisi";
        }
      });

      for (const detail of categoryGroup.categoryDetails) {
        Step2.validate(`${categoryGroup.key}-${detail.key}-ageCategory`, () => {
          if (!detail.ageCategory?.value) {
            return "Wajib diisi";
          }
        });

        Step2.validate(`${categoryGroup.key}-${detail.key}-distance`, () => {
          if (!detail.distance?.value) {
            return "Wajib diisi";
          }
        });

        Step2.validate(`${categoryGroup.key}-${detail.key}-teamCategory`, () => {
          if (!detail.teamCategory?.value) {
            return "Wajib diisi";
          }
        });

        Step2.validate(`${categoryGroup.key}-${detail.key}-quota`, () => {
          if (!detail.quota) {
            return "Wajib diisi";
          }
        });
      }
    }

    step === 1 && ValidationErrors.addByGroup({ stepGroup: 1, errors: Step1.errors });
    step === 2 && ValidationErrors.addByGroup({ stepGroup: 2, errors: Step2.errors });

    setValidation((state) => ({ ...state, errors: ValidationErrors.nextErrorsState }));

    if (ValidationErrors.isNextValid()) {
      onValid?.();
    } else {
      onInvalid?.(ValidationErrors.nextErrorsState);
    }
  };

  return { isValid, errors: validationErrors, validate };
}

const ValidationErrorsByStep = (errorsState) => {
  const nextErrorsState = { ...errorsState };
  const isNextValid = () => !Object.keys(nextErrorsState)?.length;

  const addByGroup = ({ stepGroup, errors }) => {
    if (!Object.keys(errors)?.length) {
      delete nextErrorsState[stepGroup];
    } else {
      nextErrorsState[stepGroup] = errors;
    }
  };

  return { nextErrorsState, isNextValid, addByGroup };
};

const StepGroupValidation = () => {
  const validationErrors = {};
  return {
    errors: validationErrors,
    validate: (fieldName, validate) => {
      const result = validate();
      if (result) {
        validationErrors[fieldName] = [result];
      }
    },
  };
};

export { useEventDataValidation }; 