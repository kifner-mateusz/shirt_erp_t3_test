import { useMediaQuery } from "@mantine/hooks";
import { IconList, IconNotebook } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import Workspace from "~/components/Workspace";
import ClientAddModal from "~/page-components/erp/client/ClientAddModal";
import ClientsList from "~/page-components/erp/client/ClientList";

const entryName = "clients";

const ClientsPage = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const isMobile = useMediaQuery(
    "only screen and (hover: none) and (pointer: coarse)"
  );
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  return (
    <div className="flex gap-4">
      <Workspace
        cacheKey={entryName}
        childrenLabels={
          id ? ["Lista klientów", "Właściwości"] : ["Lista klientów"]
        }
        childrenIcons={[IconList, IconNotebook]}
        defaultActive={id ? 1 : 0}
        defaultPinned={isMobile ? [] : id ? [0] : []}
      >
        {/* <div className="m-7 w-[420px] rounded bg-white p-2 shadow-lg dark:bg-stone-800"> */}
        <ClientsList
          selectedId={id !== undefined ? parseInt(id) : null}
          onAddElement={() => setOpenAddModal(true)}
        />
        {/* </div> */}
        {/* <ApiEntryEditable
          template={template}
          entryName={entryName}
          id={id}
          allowDelete
        /> */}
      </Workspace>
      <ClientAddModal
        opened={openAddModal}
        onClose={(id?: number) => {
          setOpenAddModal(false);
          id !== undefined &&
            router.push(`/erp/clients/${id}`).catch((e) => {
              throw e;
            });
        }}
      />
    </div>
  );
};

export default ClientsPage;
