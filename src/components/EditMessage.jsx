import { Text, Button, Box } from "@chakra-ui/react";

const reloadPage = () => {
  location.reload();
};

export const EditMessage = ({ state }) => {
  let toastText;
  if (state == true) {
    toastText = "Event succesfully edited!";
  } else {
    toastText = "Error: edit unsuccesful, please try again";
  }
  return (
    <>
      <Box
        className="toastPopup"
        w={"20rem"}
        h={"8rem"}
        backgroundColor={"whiteAlpha.900"}
        position={"fixed"}
        transform={"translate(-50%, -50%)"}
        borderRadius={"16px"}
        boxShadow={"0 50px 600px black"}
        padding={"1rem"}
        top={"60%"}
        left={"60%"}
        zIndex={20}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Text color={"black"}>{toastText}</Text>
        <Button onClick={reloadPage}>Close</Button>
      </Box>
    </>
  );
};
