"use client";
import { useEffect, ReactNode, ReactElement } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";

interface PopupModalMessageProps {
  header: string | ReactElement;
  children: ReactNode;
  className?: string;
}

export default function PopupModalMessage({
  header,
  children,
  className,
}: PopupModalMessageProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      backdrop="blur"
      className={className}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>
              <p>{children}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="success" variant="flat" onClick={onClose}>
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
