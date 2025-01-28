import { StyleSheet } from "react-native";
import color from "src/constant/color";

export const RetencionesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    elevation: 0.5,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  input: {
    fontSize: 14,
    color: "#333",
    flex: 2,
    textAlign: "right",
  },
  buttonAdd: {
    backgroundColor: color.accentColor,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  totalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginBottom: 16,
    elevation: 0.5,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  switchRow: {},
});
