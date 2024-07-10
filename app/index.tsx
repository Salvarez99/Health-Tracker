import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import {LineChart} from 'react-native-gifted-charts';
import { useRouter } from "expo-router";
import * as Local from '../LocalDB/InitializeLocal';

export default function Index() {
  const router = useRouter();

  const data1=[ {value:50}, {value:80}, {value:90}, {value:70} ]
  const [weights, setWeights] = useState([]);
  interface recordItem {
    weight: string;
    date: string;
  }

  let data: recordItem[] = [
    {weight: '120 lbs', date : 'Dec 28, 1968'},
    {weight: '180 lbs', date : 'Apr 13, 1996'},
  ];

  useEffect(()=>{
    Local.createTable();
    // Local.fetchAllEntries(setWeights);
  },[]);

  const renderItem = ({item} : {item : recordItem}) =>{
    return(
      <TouchableOpacity style={styles.itemContainer}>
        <Text>{item.weight}</Text>
        <Text>{item.date}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartView}>
        <LineChart 
          data={data1}
          width={320}
          height={260}
          />
      </View>
      <View style={styles.recordsView}>
        <FlatList 
          data={data} 
          renderItem={renderItem}
          />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.recordButton} onPress={() => router.push('recordWeight')}>
          <Text style={styles.buttonText}>  Record Weight </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
  },
  chartView : {
    flex : 5,
    backgroundColor : '#ffff',
    borderBottomWidth : 1,
    elevation : 5,
    paddingTop : 10,
    paddingLeft : 5,
  },
  recordsView : {
    flex : 6,
    backgroundColor : '#D9D9D9',
  },
  footer : {
    flex : 1,
    backgroundColor : '#D9D9D9',
    justifyContent: "center",
    alignItems: 'center',

  },
  recordButton : {
    backgroundColor : '#575757',
    height: 34,
    width : 140,
    borderRadius : 20,
    justifyContent : 'center',
    alignItems : 'center',
    elevation : 5,
  },
  buttonText : {
    color : '#FFFFFF'
  },
  itemContainer : {
    padding : 17,
    borderBottomWidth :  1,
    flexDirection : 'row',
    justifyContent : 'space-between'
  }
});