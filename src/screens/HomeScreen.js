import { Dimensions, View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React from "react";
import COLORS from '../assets/colors';
import Icon from '@expo/vector-icons/Ionicons';
import pets from '../assets/pets';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LogBox } from 'react-native';



import axios from '../api/server';

const { height } = Dimensions.get('window');

const petCategories = [
  { name: 'CATS', icon: 'cat' },
  { name: 'DOGS', icon: 'dog' },
  { name: 'BIRDS', icon: 'ladybug' },
  { name: 'BUNNIES', icon: 'retweet' }, 
];

const Card = ({pet, navigation}) => {
  return <TouchableOpacity activeOpacity={0.8}
  onPress={() => navigation.navigate('Details', pet)}>
    <View style={style.cardContainer}>
      <View style={style.cardImageContainer}>
        <Image source={pet.image} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
      </View>
      <View style={style.cardDetailContainer}>
        <View style={{
          flexDirection: 'row',
        justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', color: COLORS.dark, fontSize: 20}}>
          {pet?.name}
          </Text>
        </View>
        <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>{pet?.type}</Text>
      </View>
    </View>
  </TouchableOpacity>   
}


const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = React.useState(null);
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);
  
  
  React.useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])


  React.useEffect(() => {
    axios.get('/api/categoriasNegocio', {
        headers: {
          'Authorization': 'Bearer 124|MsvlnDXCmjTcvZSsl3D60GGsGi4FBp7fTCJeGoBW'
        }
      })
      .then((response) => {      
      setCategories(response.data);
    });
  }, []);
  
  console.log(categories);

  React.useEffect(() => {
    axios.get('/api/negocios', {
        headers: {
          'Authorization': 'Bearer 124|MsvlnDXCmjTcvZSsl3D60GGsGi4FBp7fTCJeGoBW'
        }
      })
      .then((response) => {      
      setCategories(response.data);
    });
  }, []);
  
  console.log(categories);


  const fliterPet = index => {
    const currentPets = pets.filter((item) => item?.pet?.toUpperCase() == petCategories[index].name,)[0].pets;
    setFilteredPets(currentPets);
  }

  React.useEffect(() => {
    fliterPet(0)
  }, []);


  return (
    
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <Text style={style.user}>Hola, Percy Taquila</Text>
          <Text style={style.message}>¡Bienvenido! a nuestro Marketplace</Text>
        </View>
        <Image source={ require('../assets/img/perfil.jpg')}
        style={ style.imgUser } />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}>
          <View style={style.searchInputContainer}>
            <Icon name="search" size={24} color={COLORS.grey} />
            <TextInput placeholder="Ingrese un negocio que desee buscar" style={{flex: 1, paddingLeft: 8}} placeholderTextColor={COLORS.grey} />
          </View>
         {/* Render all the categories */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            {categories.map((item, index) => (
              <View key={'pet' + index} style={{alignItems: 'center'}}>
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
                          ? COLORS.primary
                          : COLORS.white,
                    },
                  ]}>
                  <Icon
                    name={item.icon}
                    size={30}
                    color={
                      selectedCategoryIndex == index
                        ? COLORS.white
                        : COLORS.primary
                    }
                  />
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{item.name}</Text>
              </View>
            ))}
          </View> */}

       {/* Render the cards with flatlist */}
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
    paddingVertical: 40
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
  },

  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  }



  
})

export default HomeScreen;
