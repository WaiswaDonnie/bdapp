import { SafeAreaView, ScrollView, Text,StyleSheet,View,TouchableOpacity, ActivityIndicator } from "react-native";
import CustomNavigationHeader from "../../components/CustomNavigationHeader";
import OccasionCalendarList from "../../components/OccassionCalendarList";
import { colors } from "../../colors/colors";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons"

export default function SpecialOcassionsCalendar({setValue}){
   const [loading,setLoading] =useState(false)
   const [birthdays,setBirthdays] =useState([])
    const getBirthdays = async()=>{
        setLoading(loading)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://app.loyalpatron.com/bc_dev/ws/occasion_list?patron_id=1", requestOptions)
            .then(response => response.json())
            .then(result => {
                setBirthdays(result)
                console.log(result)

            })
            .catch(error => console.log('error', error));
    }
 
    useEffect(()=>{
        getBirthdays()
    },[])
 
    
      
      
return(
    <SafeAreaView style={{flex:1,backgroundColor:"white",}}>
        <CustomNavigationHeader    label={"The Birthday Club"}  />
        <Text style={{
            fontSize:18,
            color:colors.red,
            margin:10,
            textTransform:"uppercase",
            fontWeight:"bold"
        }}>Special Occassion Calendar</Text>
      <ScrollView style={{paddingHorizontal:10}}>
        {loading?<ActivityIndicator size={30} color={colors.red}/>:<>
        {birthdays.map((birthday,index)=>(
            <OccasionCalendarList  birthday={birthday}/>
        ))}
        </>}
      
      </ScrollView>
      <View style={styles.roundedButtonContainer}>
        <TouchableOpacity
        onPress={()=>{
            setValue("add")
        }}
         style={styles.roundedButton}>
            <Icon name="add" color={colors.white} style={{
                fontSize:30
            }}  />
 
        </TouchableOpacity>
      </View>

    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    roundedButtonContainer: {
      position: "absolute",
      bottom: 50,
      right: 20,
    },
    roundedButton: {
      backgroundColor: colors.red,
      elevation:10,
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
    },
  });