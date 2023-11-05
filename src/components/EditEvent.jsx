import { Form } from "react-router-dom";
import { useState } from "react";
import { EditMessage } from "./EditMessage";
import {
  Heading,
  Button,
  Center,
  Input,
  FormControl,
  SimpleGrid,
  FormLabel,
  Stack,
} from "@chakra-ui/react";

export const EditEvent = ({ categories, closeFn, id, event }) => {
  const [toast, setToast] = useState(null);
  const [eventForm, setEventForm] = useState(event);
  const [fetchState, setFetchState] = useState(null);
  const eventEdit = async () => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(eventForm),
    });
    if (response.ok) {
      setFetchState(true);
    } else {
      setFetchState(false);
    }
  };

  return (
    <Center>
      {toast && <EditMessage state={fetchState} />}

      <Form onSubmit={eventEdit} id="edit-event-form">
        <SimpleGrid
          gridTemplateColumns="1fr"
          color="orange.300"
          columns={1}
          padding="30px"
          maxW="sm"
          h="fit-content"
          borderRadius="lg"
          bgColor="blackAlpha.800"
          spacing="20px"
          position={"-moz-initial"}
          marginBottom={"20px"}
        >
          <Button onClick={() => closeFn()}>Cancel</Button>
          <Heading>Edit event</Heading>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder={event.title ? event.title : "add a title"}
              aria-label="Title"
              type="text"
              name="title"
              onChange={(e) =>
                setEventForm({ ...eventForm, title: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder={
                event.description ? event.description : "add a description"
              }
              aria-label="Description"
              type="text"
              name="description"
              rows="6"
              onChange={(e) =>
                setEventForm({ ...eventForm, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder={event.location ? event.location : "add a location"}
              aria-label="Location"
              type="text"
              name="location"
              onChange={(e) =>
                setEventForm({ ...eventForm, location: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Add image url:</FormLabel>
            <Input
              placeholder={event.image ? event.image : "add an image URL"}
              aria-label="Image"
              type="url"
              name="image"
              onChange={(e) =>
                setEventForm({ ...eventForm, image: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Add a category:</FormLabel>
            <Stack>
              <select
                placeholder="Categories"
                name="categoryIds"
                onChange={(e) =>
                  setEventForm({ ...eventForm, categoryIds: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>When does your event start?</FormLabel>
            <Input
              placeholder={
                event.startTime ? event.startTime : "add a start time"
              }
              aria-label="Date"
              type="text"
              name="startTime"
              onChange={(e) =>
                setEventForm({ ...eventForm, startTime: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>When does your event end?</FormLabel>
            <Input
              placeholder={event.endTime ? event.endTime : "add an end time"}
              aria-label="Date"
              type="text"
              name="endTime"
              onChange={(e) =>
                setEventForm({ ...eventForm, endTime: e.target.value })
              }
            />
          </FormControl>
          <Button type="submit" onClick={setToast}>
            Submit
          </Button>
        </SimpleGrid>
      </Form>
    </Center>
  );
};