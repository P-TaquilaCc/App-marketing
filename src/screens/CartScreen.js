import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CartScreen = ({navigation}) => {
  const [product, setProduct] = React.useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataProduct();
    });
    return unsubscribe;
  }, [navigation]);

  const getDataProduct = async () => {
    let items = await AsyncStorage.getItem('cartItems')
    items = JSON.parse(items);
    if (items) {
      setProduct(items);
    }
  }

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity key={index} style={{
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
      }}>
        <View style={{
          width: '30%',
          height: 100,
          padding: 14,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F0F0F3',
          borderRadius: 10,
          marginRight: 22,
        }}>
          <Image source={{uri:'http://192.168.1.53:8000/storage/uploads/productos/' + data.image}} style={{width: '100%', height: '100%', resizeMode: 'contain'}}>
          </Image>
        </View>
        <View style={{
          flex: 1,
          height: '100%',
          justifyContent: 'space-around',
        }}>
          <View>
            <Text style={{
              fontSize: 14, maxWidth: '100%',
              color: COLORS.dark,
              fontWeight: 'bold',
            }} >
              {data.name}
            </Text>
            <View>
              <Text style={{
                fontSize: 12,
                fontWeight: '400',
                maxWidth: '85%',
                marginRight: 4,
                marginTop: 3,
                color: 'gray'
              
              }}>
                S/. {data.price}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: '#B9B9B9',
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: '#777777',
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: '#B9B9B9',
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: '#777777',
                  }}
                />
              </View>
            </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="delete-outline"
              style={{
                fontSize: 16,
                color: '#777777',
                backgroundColor: '#F0F0F3',
                padding: 8,
                borderRadius: 100
              }}
            />
          </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.containerMain}>
        <Text style={style.title}>Pedidos</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 16}}>{ product ? product.map(renderProducts) : null }</View>
      </ScrollView>
    </SafeAreaView>
  )
}


const style = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  }
  
});

export default CartScreen