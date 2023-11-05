import { EventList } from "./EventList";
import { Input, SimpleGrid } from "@chakra-ui/react";

export const FilterEvents = ({
  clickFn,
  events,
  categories,
  setSearchField,
}) => {
  const onChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search for events:"
        _placeholder={{ color: "black" }}
        onChange={onChange}
        bgColor="orange.300"
        focusBorderColor="black"
        borderRadius={10}
        cursor="pointer"
        _hover={{ transform: "scale(1.01)" }}
        marginBlock="2"
      />
      <SimpleGrid columns={[1, 1, 2, null, 3]} spacing="20px">
        <EventList clickFn={clickFn} events={events} categories={categories} />
      </SimpleGrid>
    </>
  );
};
