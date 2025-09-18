import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

storage.set("userToken", "abc123");
const token = storage.getString("userToken");
