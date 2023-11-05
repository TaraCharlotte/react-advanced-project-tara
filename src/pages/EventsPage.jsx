import React from "react";
import { Heading, Center, Radio, RadioGroup } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { FilterEvents } from "../components/FilterEvents";
import { useState, useEffect } from "react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = ({ clickFn }) => {
  const { events, categories } = useLoaderData();
  const [searchField, setSearchField] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("no filter");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const categoriesFiltered = ["no filter"];
  categories.map((cat) => {
    categoriesFiltered.push(cat.name);
  });

  useEffect(() => {
    if (searchField === undefined || searchField === "") {
      if (filteredCategory === "no filter") {
        setFilteredEvents(events);
      } else {
        const chosenCategory = categories.find(
          (category) => category.name === filteredCategory
        );
        const eventsWithCategory = events.filter((event) =>
          event.categoryIds.includes(chosenCategory.id)
        );
        setFilteredEvents(eventsWithCategory);
      }
    } else {
      const eventInFilters = events.filter((event) =>
        event.title.toLowerCase().includes(searchField.toLowerCase())
      );
      if (filteredCategory === "no filter") {
        setFilteredEvents(eventInFilters);
      } else {
        const chosenCategory = categories.find(
          (category) => category.name === filteredCategory
        );
        const eventsWithCategory = eventInFilters.filter((event) =>
          event.categoryIds.includes(chosenCategory.id)
        );
        setFilteredEvents(eventsWithCategory);
      }
    }
  });

  return (
    <Center>
      <div className="events-page">
        <Heading>List of events</Heading>
        <RadioGroup
          onChange={setFilteredCategory}
          value={filteredCategory}
          name="filterCat"
        >
          {categoriesFiltered.map((cat) => (
            <Radio key={cat} value={cat} pr={5}>
              {cat}
            </Radio>
          ))}
        </RadioGroup>
        <FilterEvents
          searchField={searchField}
          setSearchField={setSearchField}
          events={filteredEvents}
          clickFn={clickFn}
          categories={categories}
        />
      </div>
    </Center>
  );
};
