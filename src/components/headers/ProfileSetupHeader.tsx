import { ReactComponent as ChevronRightIcon } from "assets/icons/chevron-right.svg";
import { ReactComponent as BackIcon } from "assets/icons/arrow-left.svg";
import { Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useSectionHook, { SectionKeys } from "pages/get-started/useSectionHook";
import useAuthDetails from "pages/auth/useAuthDetails";
import { ProfileSectionKeysMap } from "pages/auth/RegistrationType";

export default function ProfileSetupHeader() {
  const [isOpen, setOpen] = useState(false);

  const profileType = (useAuthDetails().profileType || "ATHLETES") as keyof ProfileSectionKeysMap;

  const { sections, onSectionChange } = useSectionHook(profileType); // dynamically use user profile type
  const toggleDrawer = () => setOpen((prevState) => !prevState);

  const handleSectionSelect = (sectionKey: SectionKeys<typeof profileType>) => {
    // // dynamically use user profile type
    onSectionChange(sectionKey);
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        {!isOpen && <BackIcon onClick={toggleDrawer} />}
        <Typography
          variant="p$18"
          fontWeight="medium"
          position="absolute"
          left="50%"
          className="translate-x-[-50%]"
        >
          Profile
        </Typography>
      </Stack>

      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer}
        className="*:!top-16"
        ModalProps={{}}
        PaperProps={{
          style: { padding: 16, paddingTop: 8 },
          className: "w-screen !bg-quaternary !shadow-none",
        }}
      >
        <Stack component="ul" role="list" paddingY={1} className="">
          {Object.entries(sections).map(([key, { label }], index) => (
            <Stack
              key={label}
              direction="row"
              justifyContent="space-between"
              paddingLeft={4}
              paddingRight={3}
              alignItems="center"
              onClick={() => handleSectionSelect(key as SectionKeys<typeof profileType>)}
              width="100%"
              height={56}
              spacing={3}
              marginBottom={2}
              className="bg-white rounded-lg"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <div
                  className="rounded-full 
                        text-primary bg-[#EBF4FF] hover:bg-[#C5E1F5]
                     h-8 w-8 flex items-center justify-center"
                >
                  {++index}
                </div>
                <Typography
                  variant="p$18"
                  fontWeight="medium"
                  className="min-w-0 flex-auto text-inherit"
                >
                  {label}
                </Typography>
              </Stack>
              <ChevronRightIcon width="14px" height="14px" />
            </Stack>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
