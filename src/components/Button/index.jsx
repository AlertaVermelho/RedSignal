import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

const COLORS = {
  Primary: "bg-yellow-400",
  Secondary: "bg-white border border-gray-300",
  Danger: "bg-blue-600",
};

export default function Button({
  text,
  icon,
  onPress,
  fullWidth = true,
  type = "Primary",
}) {
  const baseClass = `rounded-full py-3 px-6 flex-row justify-center items-center ${
    fullWidth ? "w-full" : ""
  } ${COLORS[type] || COLORS.Primary}`;

  const textColor =
    type === "Secondary"
      ? "text-black"
      : type === "Danger"
      ? "text-white"
      : "text-black";

  return (
    <TouchableOpacity onPress={onPress} className={baseClass}>
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={type === "Secondary" ? "#000" : "#fff"}
          className="mr-2"
        />
      )}
      <Text className={`${textColor} font-semibold text-base`}>{text}</Text>
    </TouchableOpacity>
  );
}
