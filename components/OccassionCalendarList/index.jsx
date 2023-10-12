import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { colors } from "../../colors/colors";
import CalendarIcon from 'react-native-vector-icons/Foundation'
import Caret from "react-native-vector-icons/MaterialIcons"

export default function OccasionCalendarList({ birthday, key }) {
  function formatDate(occasionDate) {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    const date = new Date(occasionDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return `${month} ${day}, ${year} at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  return (
    <TouchableOpacity key={key} style={styles.container}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
      }}>
        <CalendarIcon color={colors.red} name="calendar" size={40} />
        <View>
          <Text style={styles.title}>{birthday?.name+ '`s '+ birthday?.occasion_type}</Text>
          <Text style={styles.subTitle}>{formatDate(birthday?.occasion_date)}</Text>
        </View>
      </View>
      <View>
        <Caret name="arrow-forward-ios" size={20} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightblue,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 5,
    // Apply a shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color:colors.black
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
