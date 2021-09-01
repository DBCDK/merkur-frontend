import useSWR from "swr";

export default function usePeriodicJobsFiles() {
  const dataUrl = `/api/periodic-jobs`;
  const { data, isValidating } = useSWR(dataUrl);

  return {
    isLoading: !data,
    isValidating: isValidating,
    data: data,
  };
}
