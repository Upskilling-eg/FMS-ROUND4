import React from "react";
import { useSearchParams } from "react-router-dom";

function useRecipesParams() {
  const [searchParams, setSearchParams] = useSearchParams({
    pageSize: 5,
    pageNumber: 1,
    name: "",
    tagId: "",
    categoryId: "",
  });
  const recipesParams = React.useMemo(() => {
    return {
      name: searchParams.get("name"),
      categoryId: searchParams.get("categoryId"),
      tagId: searchParams.get("tagId"),
      pageSize: searchParams.get("pageSize"),
      pageNumber: searchParams.get("pageNumber"),
    };
  }, [
    searchParams.get("name"),
    searchParams.get("categoryId"),
    searchParams.get("tagId"),
    searchParams.get("pageSize"),
    searchParams.get("pageNumber"),
  ]);

  const updateParams = React.useCallback(
    (newParams) => {
      setSearchParams({ ...recipesParams, ...newParams });
    },
    [recipesParams]
  );

  const value = React.useMemo(
    () => {
      return { recipesParams, updateParams };
    },
    recipesParams,
    updateParams
  );

  console.log({ recipesParams });
  return value;
}

export default useRecipesParams;
