import { range } from "./utils";

export const paginate = ({ currentPage, totalNumberOfPages }) => {
  if (currentPage + 5 > totalNumberOfPages) {
    return range(totalNumberOfPages - 4, totalNumberOfPages + 1);
  }
  return range(currentPage, currentPage + 5);
};
