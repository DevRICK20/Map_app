import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function new_screen() {
  const contacts = [
    { name: "John Doe", number: "+91 9876543210", desc: "School friend" },
    { name: "Emily Watson", number: "+91 9123456789", desc: "Work colleague" },
    { name: "Michael Smith", number: "+91 9988776655", desc: "Gym trainer" },
    { name: "Sophia Lee", number: "+91 9090909090", desc: "Neighbour" },
    { name: "David Johnson", number: "+91 9876501234", desc: "College buddy" },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Middle content */}
      <View className="flex-1 p-4">
        <ScrollView>
          {contacts.map((contact, index) => (
            <View
              key={index}
              className="mb-4 p-4 rounded-2xl bg-gray-100 shadow"
            >
              <Text className="text-lg font-bold text-gray-800">
                {contact.name}
              </Text>
              <Text className="text-base text-gray-600">{contact.number}</Text>
              <Text className="text-sm text-gray-500">{contact.desc}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
