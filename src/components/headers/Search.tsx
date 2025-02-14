import {
  Avatar,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
  Popper,
} from "@mui/material";
import { HTMLAttributes, useEffect, useState } from "react";
import { useLazyGetSearchQuery, User } from "services/search/api";
import { ReactComponent as SearchIcon } from "assets/icons/menu-search.svg";
import useNavigateWithHash from "pages/settings/profile/hooks/useNavigateWithHash";
import FormatProfileType from "pages/settings/profile/Utils/FormatProfileType";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch] = useLazyGetSearchQuery();
  const [options, setOptions] = useState<User[]>([]);
  const [focused, setFocused] = useState(false);
  const { sendUserToNextPage } = useNavigateWithHash();

  useEffect(() => {
    if (focused) {
      document.getElementById("continerBackdrop")?.classList.add("backdrop");
      document.body.classList.add("overflow-hidden");
    } else {
      document.getElementById("continerBackdrop")?.classList.remove("backdrop");
      document.body.classList.remove("overflow-hidden");
    }
  }, [focused]);

  useEffect(() => {
    if (!searchQuery) {
      setOptions([]);
      return;
    }

    triggerSearch(searchQuery).then((res) => {
      const data = res.data?.data.slice(0, 20);
      let optionsArr = data?.map((item) => item);
      const optionsMap: { [key: string]: number } = {};

      optionsArr = optionsArr?.filter((option) => {
        if (optionsMap[option.email]) {
          return false;
        }

        optionsMap[option.email] = 1;
        return true;
      });

      if (optionsArr) {
        optionsArr = optionsArr.slice(0, 10);
        setOptions(optionsArr);
      }
    });
  }, [searchQuery, triggerSearch]);

  const renderOption = ({ ...props }: HTMLAttributes<HTMLLIElement>, option: User) => {
    return (
      <Stack
        {...props}
        component="li"
        direction="row"
        alignItems="center"
        spacing={1}
        px={2}
        onClick={() => sendUserToNextPage(option.email, option.firstName)}
      >
        <Avatar src={option.profilePictureUrl} alt={"user"} sx={{ width: 35, height: 35 }} />
        <div>
          <Typography
            variant="p$14"
            textTransform="capitalize"
            lineHeight="15px"
            className="text-base"
          >
            {option.firstName} {option.lastName}
          </Typography>
          <Typography
            variant="p$14"
            textTransform="lowercase"
            lineHeight="15px"
            className="text-[#A9A9A9]"
          >
            {option?.email === "Golviasports@gmail.com" ? (
              ""
            ) : (
              <FormatProfileType value={option.profileType ?? ""} />
            )}
          </Typography>
        </div>
      </Stack>
    );
  };

  return (
    <Autocomplete
      freeSolo
      disablePortal
      disableClearable
      options={options}
      filterOptions={(x) => x}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      getOptionLabel={(option) =>
        typeof option == "string" ? option : `${option.firstName}${" "}${option.lastName}`
      }
      renderOption={(props, option) => renderOption(props, option)}
      noOptionsText=""
      slotProps={{
        popper: { sx: { mt: 8, maxHeight: "550px" } },
        clearIndicator: { style: { display: "none" } },
        popupIndicator: { style: { display: "none" } },
        paper: {
          sx: {
            backgroundColor: "#fff",
            borderRadius: "12px",
          },
        },
        listbox: {
          sx: {
            maxHeight: "550px",
          },
        },
      }}
      sx={{
        width: 220,
        height: 36,
        transition: "0.2s width linear",
        "&:hover": {
          width: 280,
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root, & fieldset": {
              border: "none",
              height: 36,
            },
          }}
        />
      )}
      PopperComponent={(props) => {
        if (!options.length) return null;
        return <Popper {...props} className="!top-3 max-h-[550px]"></Popper>;
      }}
      className="rounded-3xl border-0 bg-quaternary h-9"
    />
  );
}
