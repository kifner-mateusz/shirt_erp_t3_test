import { useState } from "react";

import {
  IconBug,
  IconLogout,
  IconMoonStars,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import SuperJSON from "superjson";

import InputColor from "~/components/ColorPicker/InputColor";
import Button from "~/components/basic/Button";
import Modal from "~/components/basic/Modal";
import Popover from "~/components/basic/Popover";
import Select from "~/components/basic/Select";
import EditableColor from "~/components/editable/EditableColor";
import { useUserContext } from "~/context/userContext";
import useTranslation from "~/hooks/useTranslation";
import { sessionOptions } from "~/lib/session";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

const testData = {
  name: "string",
  bool: true,
  switch: false,
  category: "option 1",
  color: "#ff0000",
  date: "2021-11-05T12:24:05.097Z",
  datetime: "2021-11-05T12:24:05.097Z",
  product: null,
  client: null,
  productComponent: null,
  productComponents: [],
  image: null,
  file: null,
  files: null,
  workstations: null,
  employee: null,
  employees: null,
  submit: null,

  group: { name: "test", color: "#ff0000" },
  group2: { name: "test", color: "#ff0000" },
  group3: { name: {}, color: "#ff0000" },
  group_of_arrays: { arrayText: [], arrayText2: [] },
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: req.session },
    transformer: SuperJSON,
  });

  await ssg.session.user.prefetch();

  return {
    props: { trpcState: ssg.dehydrate() },
  };
}, sessionOptions);

function Settings() {
  const router = useRouter();
  const { locale } = router;
  const { data } = api.session.user.useQuery();
  const logout = api.session.logout.useMutation({
    onSuccess() {
      void router.push("/profile");
    },
    onError(err) {
      console.log(err.message);
    },
  });
  const t = useTranslation();
  const { debug, toggleDebug, toggleTheme, theme } = useUserContext();
  const [testFormOpen, setTestFormOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [testColor, setTestColor] = useState<string>("#fff");
  const [testValue, setTestValue] = useState<string | null>("");
  const [testDate, setTestDate] = useState<string | null>(
    "2021-11-05T12:24:05.097Z"
  );
  const { mutate } = api.client.create.useMutation();

  if (!data?.user) return null;
  const user = data.user;

  const changeLocale = (value: string) => {
    router.push("", "", { locale: value }).catch((e) => {
      throw e;
    });
  };

  return (
    <div className="flex w-full flex-row items-start justify-center pt-28 font-sans dark:text-gray-200">
      <div className="card mx-auto w-[36rem] bg-white shadow-xl dark:bg-stone-800">
        <IconUserCircle className="mx-auto -mt-20 h-32 w-32 rounded-full border-8 border-white bg-gray-200 stroke-slate-900 dark:border-stone-800  dark:bg-stone-800  dark:stroke-gray-200 " />
        <div className="mt-2 text-center text-3xl font-medium">
          {user?.name}
        </div>
        <hr className="mt-8 dark:border-stone-600 " />
        <div className="flex flex-col gap-3 p-4 ">
          <Button onClick={() => logout.mutate()} leftSection={<IconLogout />}>
            {t.sign_out}
          </Button>
          <div className="flex items-center justify-stretch">
            <span className="w-1/2">{t.language}</span>
            <Select
              data={["pl", "en"]}
              defaultValue={locale ?? "pl"}
              onValueChange={changeLocale}
            />
          </div>
          <Button
            onClick={toggleTheme}
            leftSection={theme === 1 ? <IconSun /> : <IconMoonStars />}
          >
            {theme === 1 ? t.light_theme : t.dark_theme}
          </Button>
          <Button
            onClick={() => {
              toggleDebug();
            }}
            leftSection={<IconBug />}
          >
            Debug {debug ? "ON" : "OFF"}
          </Button>
          {debug && (
            <>
              <Button
                onClick={() => {
                  setTestFormOpen(true);
                }}
                leftSection={<IconBug />}
              >
                Open Test Form
              </Button>
            </>
          )}
          <Popover trigger={<Button>PopOver</Button>}>
            <h1>text</h1>
          </Popover>
          <Modal
            open={testFormOpen}
            onClose={() => setTestFormOpen(false)}
            title={"test test"}
            description={"test2 test2"}
          >
            {/* <DisplayCell rightSection={<IconBug />} leftSection={<IconBug />}>
              test display cell
            </DisplayCell>
            <DisplayCell
              rightSection={<IconBug />}
              leftSection={<IconBug />}
              disabled
            >
              test display cell
            </DisplayCell>
             <EditableText
              label="test"
              value={testValue ?? undefined}
              onSubmit={setTestValue}
              rightSection={<IconBug />}
              leftSection={<IconBug />}
            />
            <EditableDate
              label="date"
              value={testDate ?? undefined}
              // rightSection={<IconBug />}
              leftSection={<IconBug />}
              onSubmit={(val) => console.log(val)}
            /> */}
            <EditableColor
              label="test color"
              value={testColor}
              onSubmit={(val) => setTestColor(val ?? "")}
            />
            <InputColor />
            {/* <ColorArea
              initialValue={{ saturation: 55, brightness: 55 }}
              hue={0}
            /> */}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Settings;
