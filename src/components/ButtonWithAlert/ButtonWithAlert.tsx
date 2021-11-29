import {
  AlertDialog, 
  AlertDialogOverlay, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogBody, 
  AlertDialogFooter, 
  Button, 
  useDisclosure,
  ButtonProps
} from "@chakra-ui/react"
import { useRef } from "react";

interface Props extends ButtonProps {
  onConfirm: () => void;
  dialogHeader: string;
  dialogBody: string;
}

export function ButtonWithAlert(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (<>
    <Button {...props} onClick={onOpen} />
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {props.dialogHeader}
          </AlertDialogHeader>

          <AlertDialogBody>
            {props.dialogBody}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => {props.onConfirm(); onClose()}} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </>);
}

export default ButtonWithAlert;