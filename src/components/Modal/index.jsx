import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

function CustomModal({ visible, onConfirm, onCancel }) {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (!visible) setNome("");
  }, [visible]);

  const handleConfirm = () => {
    if (nome.trim()) {
      onConfirm(nome.trim());
      setNome("");
      Keyboard.dismiss();
    }
  };

  return (
    <RNModal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="bg-white p-6 rounded-lg w-[80%]"
          >
            <Text className="text-lg font-semibold mb-3">Salvar local</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Digite o nome do local"
              value={nome}
              onChangeText={setNome}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleConfirm}
            />
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity onPress={onCancel}>
                <Text className="text-gray-500">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm}>
                <Text className="text-blue-600 font-bold">Salvar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}

export default CustomModal;
