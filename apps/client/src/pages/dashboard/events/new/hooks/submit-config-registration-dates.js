import * as React from "react";
import EventsService from "services/events";
import { toast } from "react-hot-toast";
import { datetime } from "utils";

function useSubmitConfigRegistrationDates(eventId) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  const submitConfig = React.useCallback(
    async (payload, options = {}) => {
      try {
        setIsLoading(true);
        setErrors(null);
        const result = await EventsService.setConfigCategoryRegister(payload, { event_id: eventId });
        if (options.onSuccess) {
          options.onSuccess(result);
        }
        toast.success("Berhasil menyimpan konfigurasi");
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Gagal menyimpan konfigurasi";
        setErrors(errorMessage);
        toast.error(errorMessage);
        if (options.onError) {
          options.onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [eventId]
  );

  return { isLoading, errors, submitConfig };
}

export { useSubmitConfigRegistrationDates };

/* ======================== */
// utils

function _makePayloadConfigCategories(categories) {
  const payload = categories?.map((item) => {
    const payloadCategories = [];
    for (const pair of item?.categories) {
      for (const category of pair.categories) {
        payloadCategories.push({
          category_id: category.id,
        });
      }
    }

    const start = datetime.formatServerDatetime(item.start);
    const end = datetime.formatServerDatetime(item.end);

    return {
      date_time_start_register_special_category: start,
      date_time_end_register_special_category: end,
      list_category: payloadCategories,
    };
  });

  return payload || [];
}
