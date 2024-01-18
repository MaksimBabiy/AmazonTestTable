import { AccoutsTable } from "@/entities/Account";
import ProfilesTable from "@/entities/Profile/ui/ProfilesTable";

type Props = {};

export const AccountsPage = (props: Props) => {
  return (
    <section className="flex justify-center items-center min-h-screen flex-col gap-8">
      <AccoutsTable />
    </section>
  );
};
