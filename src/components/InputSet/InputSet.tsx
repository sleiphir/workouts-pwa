import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, InputGroup, InputRightAddon, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Set } from "../../models/Workout";

interface Props {
  state: Set;
  default: Set;
  editMode: boolean;
  deleteFunc: (event: any) => void;
}

export function InputSet(props: Props) {
  const [set,     updateSet]  = useState(props.state);
  const [reps,    setReps  ]  = useState(`${props.state.reps}`);
  const [weight,  setWeight]  = useState(`${props.state.weight}`);

  useEffect(() => {
    set.reps = Number(reps);
    set.weight = Number(weight);
    updateSet(set);
  }, [reps, weight, set]);

  return (
    <>
    <Flex>
      <Box shrink="1" grow="1" m={2}>
        <Text mb="8px">Reps</Text>
        <InputGroup size="lg">
          <NumberInput
            min={1}
            value={reps}
            onChange={value => setReps(value)}
            placeholder={`${props.default.reps}`}
            autoCorrect="true"
            size="lg"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <InputRightAddon size="lg"><Text as="b">{props.default.reps}</Text></InputRightAddon>
        </InputGroup>	
      </Box>
      <Box shrink="1" grow="1" m={2}>
        <Text mb="8px">Weight</Text>
        <InputGroup size="lg">
          <NumberInput
            min={0}
            value={weight}
            onChange={value => setWeight(value)}
            placeholder={`${props.default.weight}`}
            autoCorrect="true"
            size="lg"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <InputRightAddon size="lg">Kg</InputRightAddon>
        </InputGroup>	
      </Box>
      <Box my={2}>
        { props.editMode &&
          <Button onClick={props.deleteFunc} variant="outline" size="lg" mr={2} mt="32px" colorScheme="red">
            <DeleteIcon fontSize="1rem" />
          </Button>
        }
      </Box>
    </Flex>
    </>
  )
}

export default InputSet;