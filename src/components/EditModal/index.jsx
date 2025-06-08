import { useEffect, useState } from "react";
import {
  Modal as RNModal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function EditModal({ visible, initialValue, onConfirm, onCancel }) {
  const [nome, setNome] = useState(initialValue || "");

  useEffect(() => {
    if (visible) setNome(initialValue);
  }, [visible, initialValue]);

  const handleConfirm = () => {
    if (nome.trim()) {
      onConfirm(nome.trim());
      setNome("");
    }
  };

  return (
    <RNModal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-[80%]">
          <Text className="text-lg font-semibold mb-3">Editar nome</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Digite o novo nome"
            value={nome}
            onChangeText={setNome}
          />
          <View className="flex-row justify-end gap-3">
            <TouchableOpacity onPress={onCancel}>
              <Text className="text-gray-500">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm}>
              <Text className="text-blue-600 font-bold">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
}

export default EditModal;
