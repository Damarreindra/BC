import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'
import { format } from 'date-fns';

const HistoryCard = ({item}) => {
    const date = new Date(item.date)
    var formattedDate = format(date, "MMMM do, yyyy H:mma");

  return (
    <View style={styles.box}>
        <Image width={100} height={100}  source={{ uri: item.winner.photoUrl }}/>
        <Text style={{position:'absolute', top:5, right:10}}>{formattedDate}</Text>
        <View>
      

        </View>
    </View>
  )
}

export default HistoryCard

const styles = StyleSheet.create({
box:{
    width: 350,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
}
})