import { Form, redirect, useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Checkbox,
  SimpleGrid,
  Stack,
  Radio,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return { categories: await categories.json(), users: await users.json() };
};

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  formData.createdBy = Number(formData.createdBy);
  formData.categoryIds = formData.categoryIds.split(",").map(Number);
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};

export const NewEvent = () => {
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState();

  const { categories, users } = useLoaderData();

  const toggleCategory = (categoryId) => {
    if (selectedCategories.has(categoryId)) {
      selectedCategories.delete(categoryId);
    } else {
      selectedCategories.add(categoryId);
    }
    setSelectedCategories(new Set(selectedCategories));
  };

  return (
    <Center>
      <div className="new-event">
        <Form method="post" id="new-event-form">
          <SimpleGrid
            alignItems="center"
            justifyContent="center"
            gridTemplateColumns="1fr"
            color="orange.300"
            columns={1}
            padding="30px"
            maxW="sm"
            h="fit-content"
            borderRadius="lg"
            bgColor="blackAlpha.800"
            spacing="20px"
          >
            <Heading>Add your own event</Heading>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="What is your event called?"
                aria-label="Title"
                type="text"
                name="title"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Describe your event"
                aria-label="Description"
                type="text"
                name="description"
                rows="6"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                placeholder="Where is your event?"
                aria-label="Location"
                type="text"
                name="location"
              />
            </FormControl>
            <FormLabel>Add image url:</FormLabel>
            <Input
              placeholder="Add image url"
              aria-label="Image"
              type="url"
              name="image"
            />
            <FormControl isRequired>
              <FormLabel>Your name:</FormLabel>
              <Stack>
                {users.map((user) => {
                  return (
                    <Radio
                      value={user.id}
                      key={user.id}
                      colorScheme="orange"
                      isChecked={selectedUser === user.id}
                      onClick={() => setSelectedUser(user.id)}
                      name="createdBy"
                    >
                      {user.name}
                    </Radio>
                  );
                })}
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>Category:</FormLabel>
              <Stack>
                {categories.map((category) => {
                  return (
                    <Checkbox
                      colorScheme="orange"
                      color="orange.300"
                      key={category.id}
                      name="categoryIds"
                      value={Array.from(selectedCategories)}
                      isChecked={selectedCategories.has(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      sx={{
                        borderColor: "WhiteAlpha.400",
                        paddingLeft: "5px",
                        borderRadius: "20px",
                      }}
                    >
                      {category.name}
                    </Checkbox>
                  );
                })}
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>When does your event start?</FormLabel>
              <DatePicker
                showTimeSelect
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd-MM-yyy HH:mm"
                name="startTime"
                className="datepicker-input"
              />
            </FormControl>
            <FormControl>
              <FormLabel>When does your event end?</FormLabel>
              <DatePicker
                showTimeSelect
                selected={endDate}
                minDate={startDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd-MM-yyy HH:mm"
                name="endTime"
                className="datepicker-input"
              />
            </FormControl>
            <Button bgColor="blackAlpha.700" type="submit">
              Add event
            </Button>
          </SimpleGrid>
        </Form>{" "}
      </div>
    </Center>
  );
};
