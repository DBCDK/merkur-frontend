import useSWR from "swr";

export default function useConversionFiles() {
    const dataUrl = `/api/conversions`;
    const {data, isValidating} = useSWR(dataUrl);

    return {
        isLoading: !data,
        isValidating: isValidating,
        data: data
    };
}
