import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventItemCard = ({ event, categories }) => {
  return (
    <Link to={`/event/${event.id}`}>
      <Box
        maxW="sm"
        h="fit-content"
        borderRadius="lg"
        borderWidth="0px"
        padding="8px"
        bg="orange.300"
        key={event.id}
        className="event"
        overflow="hidden"
        cursor="pointer"
        _hover={{ transform: "scale(1.01)" }}
      >
        <Image borderRadius="lg" src={event.image} width="sm" height="200px" />

        <Box>
          <Text fontSize="xl" fontWeight={"bold"}>
            {event.title}
          </Text>
          <Text fontStyle="italic">{event.description}</Text>
          <Text>
            Categories:{" "}
            {event.categoryIds
              ? event.categoryIds
                  .map((categoryId) => {
                    const category = categories.find(
                      (cat) => cat.id === categoryId
                    );
                    return category ? category.name : "";
                  })
                  .filter((categoryName) => categoryName !== "")
                  .join(", ")
              : "No categories"}
          </Text>
          <Text fontSize="xs">Starts at: {event.startTime}</Text>
          <Text fontSize="xs">Ends at: {event.endTime}</Text>
        </Box>
      </Box>
    </Link>
  );
};
