import React from "react";
import { useState } from "react";
import {
  Heading,
  Text,
  SimpleGrid,
  Center,
  Image,
  Box,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EditEvent } from "../components/EditEvent";
import { DeleteEvent } from "../components/DeleteEvent";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const userAuthor = users.find((user) => user.id === event.createdBy);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);

  return (
    <Center>
      <div className="event-page">
        {editEvent &&
          (window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
          (
            <EditEvent
              closeFn={setEditEvent}
              id={event.id}
              event={event}
              categories={categories}
            />
          ))}
        {deleteEvent && (
          <DeleteEvent closeFn={setDeleteEvent} id={event.id} event={event} />
        )}
        <SimpleGrid
          alignItems="center"
          justifyContent="center"
          gridTemplateColumns="1fr"
          color="orange.300"
          columns={1}
          padding="30px"
          maxW="md"
          h="fit-content"
          borderRadius="lg"
          bgColor="blackAlpha.800"
          spacing="20px"
        >
          <Heading>{event.title}</Heading>
          <Box
            maxW="lg"
            h="fit-content"
            borderRadius="lg"
            borderWidth="0px"
            padding="8px"
            key={event.id}
            className="event"
            overflow="hidden"
          >
            <Image
              borderRadius="lg"
              src={event.image}
              width="sm"
              height="200px"
            />
          </Box>
          <Text>{event.description}</Text>
          <Text>
            {event.title} starts at: {event.startTime} and ends at:{" "}
            {event.endTime}
          </Text>
          <Text>Location: {event.location}</Text>
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
          <Text>Created by: {userAuthor.name}</Text>
          <Image
            borderRadius="full"
            src={userAuthor.image}
            width="50px"
            height="50px"
          />
          <HStack>
            <Button onClick={setEditEvent} bgColor={"blackAlpha.600"}>
              Edit event
            </Button>
            <Button onClick={setDeleteEvent} bgColor={"blackAlpha.600"}>
              Delete event
            </Button>
          </HStack>
        </SimpleGrid>
      </div>
    </Center>
  );
};
