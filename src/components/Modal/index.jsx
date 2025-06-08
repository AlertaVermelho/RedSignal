import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function Modal({ visible, onConfirm, onCancel }) {
  const [nome, setNome] = useState("");

  const handleConfirm = () => {
    if (nome.trim()) {
      onConfirm(nome.trim());
      setNome("");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-[80%]">
          <Text className="text-lg font-semibold mb-3">Salvar local</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Digite o nome do local"
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
    </Modal>
  );
}
export default Modal;
