import React, { useContext, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts";

import templateAPI from "@/refactor_lib/services/api/v1/TemplateAPI";
import { type TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

import TemplateContentContext from "../../context";
import TemplateCard from "./container/TemplateCard";
import TemplateEmpty from "./TemplateEmpty";
import TemplateListSkeleton from "./TemplateListSkeleton";

type StatesProps = {
  data: TemplateAPIResponse["allTemplates"][];
  offset: number;
  hasMore: boolean;
};

const limit = 16;
const initialState: StatesProps = {
  data: [],
  offset: 0,
  hasMore: true,
};

function TemplateList() {
  // Initialize local state for handling data, offset, and 'hasMore' flag
  const [states, setStates] = useState<StatesProps>(initialState);

  // Access context values for category, search, and callbackMethod
  const {
    states: { category, search },
    methods: { callbackMethod },
  } = useContext(TemplateContentContext);

  // Intersection observer hook to detect when the component is in view (for infinite scroll)
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  // Mutation hook to fetch templates from the API
  const { mutateAsync, isPending, status } = useMutation({
    mutationFn: templateAPI.allTemplates,
  });

  // Function to fetch templates with pagination support (using offset)
  const fetchTemplates = async (offset?: number) => {
    try {
      // Fetch data from the API based on the current category and search criteria
      const { data } = await mutateAsync({
        category_id: category?.id > 0 ? category?.id : null,
        search,
        limit,
        offset: offset ?? states.offset,
      });

      // Determine if there are more templates to load
      const hasMore = data.length >= limit;

      // Update local state with fetched templates and pagination information
      setStates(prev => ({
        ...prev,
        data: [...prev.data, ...data],
        offset: hasMore ? prev.offset + limit : prev.offset,
        hasMore,
      }));
    } catch (error) {
      // If there is an error, mark 'hasMore' as false to stop further fetching
      setStates(prev => ({
        ...prev,
        hasMore: false,
      }));
    }
  };

  // Function to refetch templates (reset state and load data again)
  const refetch = async () => {
    setStates(initialState); // Reset state to initial state
    void fetchTemplates(0); // Fetch templates starting from the first page
  };

  // Refetch templates when the category or search criteria change
  useEffect(() => {
    refetch();
  }, [category, search]);

  // Infinite scroll: if the component is visible and more templates exist, fetch more data
  useEffect(() => {
    if (isIntersecting && states.hasMore && states.data.length >= limit) {
      void fetchTemplates();
    }
  }, [isIntersecting, states.hasMore, states.data]);

  return (
    <>
      {/* Show a skeleton loader if the data is still loading and no templates are available */}
      {isPending && !states.data.length ? (
        <TemplateListSkeleton />
      ) : states.data.length ? (
        // Render the templates in a grid layout if there are templates to display
        <div className="flex flex-col gap-y-5 pb-3">
          <div
            className={`grid it grid-cols-1 items-center ${
              !callbackMethod
                ? "sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                : "lg:grid-cols-2 xl:grid-cols-3"
            } gap-5`}
          >
            {/* Render each template in a TemplateCard component */}
            {states.data.map((el, key) => (
              <div
                key={el.id}
                {...(states.data.length === key + 1 && !isPending && { ref })}
              >
                <TemplateCard template={el} />
              </div>
            ))}
          </div>
          {/* If the data is still loading, show the skeleton loader */}
          {status === "pending" ? <TemplateListSkeleton /> : null}
        </div>
      ) : (
        // Show empty state if no templates are found
        <TemplateEmpty />
      )}
    </>
  );
}

export default TemplateList;
