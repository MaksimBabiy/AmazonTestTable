import ProfilesTable from "@/entities/Profile/ui/ProfilesTable";
import React from "react";

type Props = {};

const ProfilesPage = (props: Props) => {
  return (
    <section className="flex justify-center items-center min-h-screen flex-col gap-8">
      <ProfilesTable />
    </section>
  );
};

export default ProfilesPage;
