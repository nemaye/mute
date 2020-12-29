import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Locations from 'expo-location';

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

export default class App extends React.Component{
  state = {
    id: 0,
  }

  _getLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted'){
      console.log('ERROR')
    }
    
    const location = await Locations.getCurrentPositionAsync();
    // console.log(location.coords.latitude)

    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      }
    })
    console.log('fd',location.coords.longitude)

  }

  UNSAFE_componentWillMount(){
    this._getLocation();
  }
  

  onChange = region => {
    // console.log(JSON.stringify(region))
    this.setState({
      region
    })
  }

  handleClick = () => {
    this.setState({
      id: this.state.id+1,
      lat: this.state.region.latitude,
      lon: this.state.region.longitude,
    })
    console.log(this.state.region)
    console.log(this.state.lat,this.state.lon)
  }
render(){
  return (
    <View style={styles.container}>
      <View style={styles.flexone}>
        <MapView style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete = {this.onChange}
        >
        </MapView>
      </View>
      <View style={{top:'40%',position:'absolute'}}>
        <Image style={{height:20,width:20}} source={require('./pin.webp')}></Image>
      </View>
     <View style={styles.flextwo}>
       <Button
        title="DROP PIN"
        onPress={this.handleClick}
       />
       <Text>{this.state.id}</Text>
     </View>
    </View>
  );
}
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  flexone: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flextwo: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  }
});
