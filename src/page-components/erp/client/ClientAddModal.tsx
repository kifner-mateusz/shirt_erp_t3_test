import React, { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
// import EditableApiEntry from "../../../components/editable/EditableApiEntry";
// import EditableText from "../../../components/editable/EditableText";
// import { ClientType } from "../../../types/ClientType";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";
import Button from "~/components/basic/Button";

interface ClientAddModalProps {
  opened: boolean;
  onClose: (id?: number) => void;
}

const ClientAddModal = ({ opened, onClose }: ClientAddModalProps) => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("Klient");
  // const [template, setTemplate] = useState<Partial<ClientType> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate: createClient } = api.client.create.useMutation({
    onSuccess(data) {
      router.push(`/erp/client/${data.id}`).catch((e) => {
        throw e;
      });
    },
    onError(error) {
      setError("Klient o takiej nazwie istnieje.");
    },
  });

  useEffect(() => {
    if (!opened) {
      setUsername("Klient");
      // setTemplate(null);
      setError(null);
    }
  }, [opened]);

  return (
    <Dialog open={opened} onClose={() => onClose()}>
      <Dialog.Title>Utwórz nowego klienta</Dialog.Title>
      <div className="g-2 flex flex-col">
        {/* <EditableApiEntry
          label="Szablon"
          entryName="clients"
          Element={ClientListItem}
          onSubmit={(template) => {
            setTemplate(template);
            // username === "Klient" && setusername(template.username)
          }}
          value={template}
          withErase
          listProps={{ defaultSearch: "Szablon", filterKeys: ["username"] }}
        />
        <EditableText
          label="Nazwa użytkownika"
          onSubmit={setusername}
          value={username}
          required
        /> */}

        <Button
          onClick={() => {
            if (username.length == 0)
              return setError("Musisz podać nie pustą nazwę użytkownika");
            // const new_client = {
            //   ...(template ? omit(template, "id") : {}),
            //   address: template?.address ? omit(template.address, "id") : null,
            //   username: username,
            //   orders: [],
            //   "orders-archive": [],
            // };
            // add(new_client)
            //   .then((data) => onClose(data?.data?.id))
            //   .catch(() => setError("Klient o takiej nazwie istnieje."));
            createClient({ username });
          }}
        >
          <IconPlus />
          Utwórz klienta
        </Button>
        <div className="text-red-600">{error}</div>
      </div>
    </Dialog>
  );
};

export default ClientAddModal;