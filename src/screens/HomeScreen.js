import { Dimensions, View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React from "react";
import COLORS from '../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogBox } from 'react-native';
import axios from '../api/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const Card = ({pet, navigation}) => {
  return <TouchableOpacity activeOpacity={0.8}
  onPress={() => navigation.navigate('DetailsBusiness', pet)}>
    <View style={style.cardContainer}>
      <View style={style.cardImageContainer}>
        <Image source={{uri : global.url + '/storage/uploads/negocio/' + pet?.imagen}} style={{width: '100%', height: '100%'}} />
      </View>
      <View style={style.cardDetailContainer}>
        <View style={{
          flexDirection: 'row',
        justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', color: COLORS.dark, fontSize: 20}}>
          {pet?.nombre}
          </Text>
        </View>
        <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>Horario: {pet?.hora_inicio + " - " + pet?.hora_fin}</Text>
        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="map-marker" color={COLORS.primary} size={18} />
            <Text style={{fontSize: 12, color: COLORS.grey, marginLeft: 5}}>
              Dirección: { pet?.direccion }
            </Text>
          </View>
      </View>
    </View>
  </TouchableOpacity>   
}


const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = React.useState([]);
  const [business, setBusiness] = React.useState([]);
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);
  
  React.useEffect(() => {
    
    handleGetToken();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    fliterPet(0);


  

  /* AsyncStorage.removeItem('cartItems', (error) => {
         let value = "Datos borrados con éxito:"
    if (error) {
             value = "Error al eliminar datos:"
    }
    alert(value + error)
  }); */




  }, []);


  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('userToken');
    axios.get('/api/categoriasNegocio', {
      headers: {
        'Authorization': 'Bearer ' + dataToken,
      }
    })
    .then((response) => {
      setCategories(response.data);
    });

    axios.get('/api/negocios', {
      headers: {
        'Authorization': 'Bearer ' + dataToken,
      }
    })
    .then((response) => {
      setBusiness(response.data);
    });

    //console.log(categories);

  }

  const fliterPet = index => {
      const currentPets = business.filter((item) => item?.idCategoria == categories[index].id);
      setFilteredPets(currentPets);
  }



  return (
    
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <Text style={style.user}>Percy Taquila</Text>
          <Text style={style.message}>¡Bienvenido! a nuestro Marketplace</Text>
        </View>
        <Image source={ require('../assets/img/perfil.jpg')}
        style={ style.imgUser } />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}>
          {/* Buscador */}
          <View style={style.searchInputContainer}>
            <Icon name="magnify" size={24} color={COLORS.grey} />
            <TextInput placeholder="Ingrese un negocio que desee buscar" style={{flex: 1, paddingLeft: 5}} placeholderTextColor={COLORS.grey} />
          </View>
         {/* Render de las categorías de los negocio */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            {categories.map((item, index) => (
              <View key={'business' + index} style={{alignItems: 'center', marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    setSeletedCategoryIndex(index);
                    fliterPet(index);
                  }}
                  style={[
                    style.categoryBtn,
                    {
                      backgroundColor:
                        selectedCategoryIndex == index
                          ? "#3093FA"
                          : COLORS.white,
                    },
                  ]}>
                  <Image source={{ uri: global.url + '/storage/uploads/categoriaNegocio/' + item.imagen }} style={{ width: '100%', height: '100%', resizeMode: 'contain', }} />
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{item.nombre}</Text>
              </View>
            ))}
          </View>

       {/* Render de Negocios */}
          <View style={{marginTop: 20}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredPets}
              renderItem={({item}) => (
                <Card pet={item} navigation={navigation} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
   
  );
};

const style = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImageContainer: {
    height: 120,
    width: 140,
    backgroundColor: COLORS.background,
    /* backgroundColor: COLORS.background,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10, */
  },
  cardDetailContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
  },

  user: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  message: {
    fontSize: 12,
    color: "gray"
  },

  imgUser: {
    height: 50,
    width: 50,
    borderRadius: 50
  },

  mainContainer: {
    minHeight: height,
    backgroundColor: COLORS.light,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },

  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    padding: 3
    
  },

  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  }
})

export default HomeScreen;
