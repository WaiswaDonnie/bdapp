import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker';
import CustomNavigationHeader from '../../components/CustomNavigationHeader';
import { colors } from '../../colors/colors';

function AddOccasion({ setValue }) {
    const [name, setName] = useState('');
    const [occasionType, setOccasionType] = useState('other');
    const [otherOccasion, setOtherOccasion] = useState('');
    const [date, setDate] = useState('');
    const [occurrence, setOccurrence] = useState('everyYear');

    const handleOccasionTypeChange = (value) => {
        setOccasionType(value);
        if (value !== 'other') {
            setOtherOccasion('');
        }
    };

    const [loading,setLoading] = useState(false)
   
    const handleSaveButtonPress = async() => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "patron_id": "1",
            "name": "Judas Jones",
            "occasion_type": "birthday",
            "occasion_other": "",
            "occasion_date": "2023-10-18",
            "repeat": "year",
            "relation": "partner"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://app.loyalpatron.com/bc_dev/ws/occasion_new", requestOptions)
            .then(response => response.json())
            .then(result => {
                Alert.alert("Added Successfully",`Title of ${result?.title} and Id of ${result?.id} has been added successfully.`)
                setLoading(false)
                setValue("home")
            })
            .catch(error => console.log('error', error));
       
     };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomNavigationHeader showBack={true} />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    placeholder="Enter name"
                    value={name}
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                />

                <Text style={styles.label}>Occasion Type:</Text>
                <RadioButtonsGroup
                    containerStyle={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    radioButtons={[
                        { label: 'Birthday', value: 'birthday', id: "12", size: 14 },
                        { label: 'Other Occasion', value: 'other', size: 14 },
                    ]}
                    onSelection={handleOccasionTypeChange}
                    selectedValue={occasionType}
                />

                {occasionType === 'other' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter other occasion"
                        value={otherOccasion}
                        onChangeText={(text) => setOtherOccasion(text)}
                    />
                )}

                <Text style={styles.label}>Date:</Text>
                <DatePicker
                    style={{ width: "100%", borderRadius: 5, marginVertical: 5 }}
                    date={date}
                    mode="date"
                    placeholder="Select date"
                    format="MM/DD/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(selectedDate) => setDate(selectedDate)}
                />

                <Text style={styles.label}>Occurrence:</Text>
                <RadioButtonsGroup
                    containerStyle={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    radioButtons={[
                        { label: 'Every Year', value: 'everyYear', id: "23", size: 14 },
                        { label: 'One Time', value: 'oneTime', id: "43", size: 14 },
                    ]}
                    onSelection={(value) => setOccurrence(value)}
                    selectedValue={occurrence}
                />
            </ScrollView>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveButtonPress}>
                    {loading?<ActivityIndicator color={colors.white} size={20}/>: <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default AddOccasion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 60, // Adjust the bottom padding to make space for the button
    },
    input: {
        borderColor: '#717070',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 45,
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
        color: colors.black
    },
    saveButton: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        backgroundColor: colors.red,
        padding: 15,
        marginHorizontal: 20,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'center',
    },
});
