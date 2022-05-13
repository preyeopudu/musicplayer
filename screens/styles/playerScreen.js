import { ScaledSheet } from "react-native-size-matters";

export const playerScreenStyles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  audioTitle: {
    fontSize: "16@s",
    fontWeight: "900",
    width: "70%",
    color: "#808080",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "15@s",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imageContainer: {
    height: "200@s",
    width: "200@s",
    backgroundColor: "#fff",
    elevation: 4,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  image: {
    height: "120@s",
    width: "120@s",
    alignSelf: "center",
  },
  body: {
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    paddingBottom: "20@vs",
  },
  button: {
    borderRadius: 100,
    borderWidth: 0.5,
    width: "35@s",
    height: "35@s",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#808080",
  },
  controller: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: "20@vs",
    paddingBottom: "5@vs",
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "15@vs",
  },
  slider: {
    width: "200@s",
  },
  sliderText: {
    fontSize: "12@s",
    color: "#808080",
  },
});
