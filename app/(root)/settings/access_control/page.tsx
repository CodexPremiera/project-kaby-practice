import ManagerRowHead from "@/components/settings/access_control/manager_row_head";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import {ManagerProvider} from "@/components/settings/access_control/manager_context";
import ManagerList from "@/components/settings/access_control/manager_list";

function Page() {
  return (
    <ManagerProvider>
      <section className="flex flex-col w-full items-center mx-4 mb-36 pt-[120px]">
        <div className="flex flex-col gap-[60px] w-full max-w-[600px] lg:max-w-[1120px]">
          <div className="flex flex-col w-full max-w-[800px] items-start gap-8 py-0 px-6">
            <div className="flex flex-row justify-between items-start gap-2 w-full">
              <h1 className="flex flex-col justify-center h-[2.625rem] text-[#111] font-inter text-[1.75rem] font-semibold leading-[12px]">
                Access Control
              </h1>
              <ButtonSecondary>Add a manager</ButtonSecondary>
            </div>

            <ManagerRowHead />

            {/* Render rows from context */}
            <ManagerList />
          </div>
        </div>
      </section>
    </ManagerProvider>
  );
}

export default Page;
