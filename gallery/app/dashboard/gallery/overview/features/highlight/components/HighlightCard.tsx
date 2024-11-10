"use client";
import { LoadSmall } from "@/components/loader/Load";
import { fetchHighlightData } from "@/services/overview_highlights/fetchHighlightData";
import { useQuery } from "@tanstack/react-query";
type HightlightCardProps = {
  title: string;
  icon: React.ReactNode;
  tag: string;
};
export default function HighlightCard({ tag }: HightlightCardProps) {
  const { data, isLoading } = useQuery({
    queryKey: [`highlight`, tag],
    queryFn: async () => {
      const data = await fetchHighlightData(tag);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadSmall />;

  return <h4 className="font-normal text-xs text-dark">{data}</h4>;
}
