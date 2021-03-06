import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TextInput,
TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios"

const RoomMade = ({ navigation }) => {
  let house = {};
  const [checked, setChecked] = useState("none");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={ ()=>navigation.goBack() }
        >
          <Image 
            source={require('./image/left_arrow.png')}
            style={styles.imageButton}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.black}>방 생성</Text>
        <TouchableWithoutFeedback
          onPress={ ()=>navigation.popToTop() }
        >
          <Image 
            source={require('./image/x.png')}
            style={styles.imageButton}
          />
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.content}>
        <Text style={styles.black}>각 항목을 입력해 주세요.</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>방 이름</Text>
            </View>
            <TextInput 
              style={styles.input}
              onChangeText={(name)=>house.name = name}
            />
            <View style={styles.rowBox}>
              <Text style={styles.rowText}></Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>방 위치</Text>
            </View>
            <TextInput 
              style={styles.input}
              onChangeText={(address)=>house.address = address}
            />
            <View style={styles.rowBox}>
              <Text style={styles.rowText}></Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>방 크기</Text>
            </View>
            <TextInput 
              style={styles.input}
              onChangeText={(roomsize)=>house.roomsize = roomsize}
            />
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>평</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>보증금</Text>
            </View>
            <TextInput 
              style={styles.input}
              onChangeText={(deposit)=>house.deposit}
            />
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>만원</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>관리비</Text>
            </View>
            <TextInput 
              style={styles.input}
              onChangeText={(maintenance)=>house.maintenance = maintenance}
            />
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>만원</Text>
            </View>
          </View>          
        </View>

        <View style={styles.bottomTable}>
          <Text style={styles.black}>{'전세, 월세를 체크해주세요.\n'}</Text>
          <View style={styles.bottomRow}>
            <View style={styles.rowBox}>
              <Text style={styles.rowText}></Text>
            </View>
            <BouncyCheckbox
              fillColor="#D43736"
              iconStyle={{ borderColor: "#D43736" }}
              disableBuiltInState
              isChecked={checked==="first"?true:false}
              onPress={() => {setChecked("first")}} 
            />
            <View style={styles.rowBox}>
              <Text style={styles.chooseText}>전세</Text>
            </View>

            <BouncyCheckbox
              fillColor="#D43736"
              iconStyle={{ borderColor: "#D43736" }}
              disableBuiltInState
              isChecked={checked==="second"?true:false}
              onPress={() => {
                setChecked("second");
                house.isrent = true;
              }}
            />
            <View style={styles.rowBox}>
              <Text style={styles.chooseText}>월세</Text>
            </View>
            <View style={styles.rowBox}>
              <Text style={styles.rowText}></Text>
            </View>
          </View>
          <View style={checked==="second"?styles.bottomRow:{display:"none"}}>
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>월세</Text>
            </View>
            <TextInput 
              style={styles.input}
              onChangeText={(rentalfee)=>house.rentalfee = rentalfee}
            />
            <View style={styles.rowBox}>
              <Text style={styles.rowText}>만원</Text>
            </View>
          </View>
        </View>
      </View>
      
      <TouchableHighlight 
        style={styles.footer}
        underlayColor="#e65a5a"
        onPress={()=>{
          getData().then(tok => {
            house.token = tok;
            console.log(house);
            axios.post("http://192.168.35.205:8080/house", house)
              .then(resp => {
                if(resp.data.error==="null") {
                }
              }).catch(e => {console.log(e)});
          });
        }}
      >
        <Text style={styles.boldWhite}>확인</Text>
      </TouchableHighlight>
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
  imageButton: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  black: {
    fontSize: 20,
    textAlign:"center",
  },
  boldWhite: {
    fontSize: 20, 
    color: "white",
    fontWeight: "bold",
 },
  container: {
    flex: 1,
    backgroundColor:"white",
  },
  title: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 9,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    flex: 1.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: "#DCDCDC",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D43736",
  },
  table: {
    flex: 2,
    marginTop:20,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTable: {
    flex: 1,
    marginTop:20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#D43736",
    borderRadius: 10,
    flex:3,
  },
  row:{
    height:50,
    flexDirection: "row",
    marginBottom:10,
    borderRadius:10,
  },
  bottomRow:{
    height:50,
    flexDirection: "row",
    marginBottom:10,
    borderRadius:10,
  },
  rowBox:{
    flex:1,
    justifyContent: "center",
  },
  rowText: {
    fontSize: 20,
    textAlign: "center",
  },
  chooseText:{
    fontSize: 20,
  },
});

export default RoomMade;
