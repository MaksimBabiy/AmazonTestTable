import CampaignsTable from "@/entities/Campaigns/ui/CampaignsTable";
import React from "react";

type Props = {};

const CampaignsPage = (props: Props) => {
  return (
    <section className="flex justify-center items-center min-h-screen flex-col gap-8">
      <CampaignsTable />
    </section>
  );
};

export default CampaignsPage;
