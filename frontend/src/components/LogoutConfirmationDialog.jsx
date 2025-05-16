import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button
} from "@chakra-ui/react";
import { useRef } from "react";

const LogoutConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
    const cancelRef = useRef();

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Confirm Sign Out
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to sign out? You will need to sign in again to access your content.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            Sign Out
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default LogoutConfirmationDialog;
