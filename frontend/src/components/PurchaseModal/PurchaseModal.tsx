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
import { axi } from "../../utils/axiosInstance";

interface Props {
  gameId: string;
  price: number;
  onSuccess?: () => void;
}

export const PurchaseModal = ({ gameId, price, onSuccess }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const gameIds = gameId.split(",");
      for (const id of gameIds) {
        await axi.post(`/purchases/${id}`);
      }
      toast.success("¡Compra realizada con éxito!");
      onSuccess?.();
      onOpenChange();
    } catch (error) {
      toast.error("Error al procesar la compra: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button className="bg-primaryv2 text-white w-full" onPress={onOpen}>
        Comprar
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar compra
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <div className="mb-4">
                    <p className="text-lg font-semibold">
                      Total a pagar: ${price} USD
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Input
                      label="Número de tarjeta"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, cardNumber: e.target.value })
                      }
                    />
                    <Input
                      label="Titular de la tarjeta"
                      placeholder="NOMBRE APELLIDO"
                      value={formData.cardHolder}
                      onChange={(e) =>
                        setFormData({ ...formData, cardHolder: e.target.value })
                      }
                    />
                    <div className="flex gap-4">
                      <Input
                        label="Fecha de expiración"
                        placeholder="MM/YY"
                        value={formData.expirationDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expirationDate: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="CVV"
                        placeholder="123"
                        maxLength={3}
                        value={formData.cvv}
                        onChange={(e) =>
                          setFormData({ ...formData, cvv: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    className="bg-primaryv2 text-white"
                    type="submit"
                    isLoading={loading}
                  >
                    Confirmar compra (${price} USD)
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
