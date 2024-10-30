import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { axi } from "../utils/axiosInstance";
export const ForgotPasswordModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (email === "") {
      toast.error("El email es requerido");
      return;
    }

    try {
      const response = await axi.post("/auth/forgot-password", { email });
      if (response.status === 200) {
        toast.success("Recuperacion de contraseña enviada");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p
        onClick={onOpen}
        className="text-start text-sm text-white hover:underline cursor-pointer active:text-gray-200"
      >
        ¿Has olvidado tu contraseña?
      </p>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Recuperar contraseña
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <Input
                    label="Email"
                    type="email"
                    variant="flat"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button className="bg-primaryv2 text-white" type="submit">
                    Enviar
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
