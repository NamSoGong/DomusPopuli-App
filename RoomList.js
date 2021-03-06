import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TextInput, FlatList,
TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const dat = [
  {name: '작은방', totalScore: 80},
  {name: '순방', totalScore: 50},
  {name: '돌하르방', totalScore: ""},
];

const RoomList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('./image/User.png')}
          style={styles.imageButton}
          onPress={ ()=>navigation.push(getData() ? "Mypage" : "Login") }
        />
        <Text style={styles.headerText}>방 목록</Text>
        <TouchableWithoutFeedback
          onPress={ ()=>navigation.push(getData() ? "RoomMade" : "Login") }
        >
          <Image 
            source={require('./image/plus.png')}
            style={styles.imageButton}
          />
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.content}> 
        <View style={styles.tableHeader}>
            <View style={styles.tableHeaderRoomName}>
              <Text style={styles.tableHeaderText}>방 이름</Text>
            </View>
            <View style={styles.tableHeaderScore}>
              <Text style={styles.tableHeaderText}> 점수 </Text>
            </View>
        </View>

        <View style={styles.table}>
          <FlatList
            data = {dat}
            renderItem={({item}) => (
              <View style={styles.row}>
                <TouchableWithoutFeedback 
                  onPress={ () => navigation.push("WriteCheckList", item.name)}
                > 
                  <View style={styles.tableRoomName}>
                    <Text style={styles.rowText}>{item.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback 
                  onPress={ () => navigation.push("DetailScore", item.name)}
                >
                  <View style={styles.tableScore}>
                    <Text style={styles.rowText}>{item.totalScore}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('jwt')
    return value;
  } catch(e) {
    // error reading value
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageButton: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  title: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 7,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  tableHeader:{
		flexDirection: "row",
		flex: 1,
  },
  tableHeaderText:{
		fontSize:20,
		color:"white",
		fontWeight:"bold",
		textAlign:"center",
  },
  tableHeaderRoomName:{
		backgroundColor:"#D43736",
		borderRightWidth:1,
		borderRightColor: "white",
		flex: 3,
		borderRadius:20,
		justifyContent: "center",
  },
  tableHeaderScore:{
    backgroundColor: "#D43736",
		borderRadius:20,
		flex: 1,
		justifyContent: "center",
},
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: "#DCDCDC",
  },
  table: {
    flex: 9,
  },
	tableRoomName:{
		flex: 3,
		borderRightWidth:1,
		borderRightColor: "black",
	},
	tableScore:{
		flex:1,
	},
  row:{
		height:50,
    paddingTop: 20,
    flexDirection: "row",
    alignContent: "space-around",
    justifyContent: "space-between",
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderBottomWidth: 0.3,
    borderStyle: "solid",
    borderColor: "white",
  },
  rowText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default RoomList;
