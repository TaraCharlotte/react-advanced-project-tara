import { SimpleGrid, Box, Button, HStack, Text } from "@chakra-ui/react";

export const DeleteEvent = ({ closeFn, id }) => {
  const deleteEvent = async () => {
    await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    });
  };
  return (
    <SimpleGrid>
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
        <Text>ARE YOU SURE YOU WANT TO DELETE THIS EVENT?</Text>
        <HStack>
          <Button onClick={() => closeFn()}>CANCEL</Button>
          <Button onClick={deleteEvent}>
            <a
              onClick={() => {
                window.location.href = "/";
              }}
            >
              YES
            </a>
          </Button>
        </HStack>
      </Box>
    </SimpleGrid>
  );
};
